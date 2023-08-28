import { ProxyFactory } from './factory';
import { D1DatabaseProxyHolder } from './proxies/d1_database/proxy_holder';
import { FetcherProxyHolder } from './proxies/fetcher/proxy_holder';
import { KVProxyHolder } from './proxies/kv/proxy_holder';
import { R2ProxyHolder } from './proxies/r2/proxy_holder';

const defaultHostname = 'http://127.0.0.1:8787',
  createWorker = () =>
    <ExportedHandler>{
      async fetch(
        request: Request,
        env: any,
        ctx: ExecutionContext
      ): Promise<Response> {
        if (request.method === 'POST')
          try {
            const header = request.headers.get('X-Wrangler-Proxy-Length')!,
              instructionLength = parseInt(header),
              body = request.body! as ReadableStream<Uint8Array>,
              instructionChunks: Uint8Array[] = [];
            let bytesRead = 0,
              remainingBytes: Uint8Array | undefined = undefined;
            for await (const value of body) {
              bytesRead += value.length;
              if (bytesRead > instructionLength) {
                const pivot = value.length - (bytesRead - instructionLength),
                  chunk = value.subarray(0, pivot);
                remainingBytes = value.subarray(pivot);
                instructionChunks.push(chunk);
                break;
              } else {
                instructionChunks.push(value);
              }
            }
            if (bytesRead < instructionLength) {
              return new Response('Invalid request', { status: 500 });
            }
            const bodyStream = new ReadableStream({
                async start(controller) {
                  if (remainingBytes) {
                    controller.enqueue(remainingBytes);
                  }
                  for await (const value of request.body!) {
                    controller.enqueue(value);
                  }
                },
              }),
              buffer = await new Blob(instructionChunks).arrayBuffer(),
              params = JSON.parse(new TextDecoder().decode(buffer));
            console.log(JSON.stringify(params, null, 2));
            const proxy = ProxyFactory.getProxy(params, bodyStream),
              response = await proxy.execute(env);
            return response;
          } catch (e: any) {
            return new Response(
              JSON.stringify({
                name: e.name,
                message: e.message,
                stack: e.stack,
              }),
              { status: 500 }
            );
          }
        return new Response(null, { status: 404 });
      },
    },
  connectD1 = (name: string, options?: { hostname: string }): D1Database =>
    new D1DatabaseProxyHolder({
      host: options?.hostname ?? defaultHostname,
      name,
      metadata: {},
      data: null,
    }),
  connectKV = (name: string, options?: { hostname: string }): KVNamespace =>
    new KVProxyHolder({
      host: options?.hostname ?? defaultHostname,
      name,
      metadata: {},
      data: null,
    }),
  connectServiceBinding = (
    name: string,
    options?: { hostname: string }
  ): Fetcher =>
    new FetcherProxyHolder({
      host: options?.hostname ?? defaultHostname,
      name,
      metadata: {},
      data: null,
    }),
  waitUntil = (
    promise: Promise<any>,
    context?: { waitUntil: (promise: Promise<any>) => void }
  ) => {
    if (context?.waitUntil) {
      return context.waitUntil(promise);
    } else {
      return promise;
    }
  },
  connectR2 = (name: string, options?: { hostname: string }): R2Bucket =>
    new R2ProxyHolder({
      host: options?.hostname ?? defaultHostname,
      name,
      metadata: {},
      data: null,
    });

export {
  connectD1,
  connectKV,
  connectR2,
  connectServiceBinding,
  createWorker,
  waitUntil,
};
