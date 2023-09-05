import { ProxyFactory } from './factory';
import { D1DatabaseProxyHolder } from './proxies/d1_database/proxy_holder';
import { FetcherProxyHolder } from './proxies/fetcher/proxy_holder';
import { KVProxyHolder } from './proxies/kv/proxy_holder';
import { R2ProxyHolder } from './proxies/r2/proxy_holder';

const defaultHostname = 'http://127.0.0.1:8787',
  paramsMap: Record<string, any> = {},
  createWorker = () =>
    <ExportedHandler>{
      async fetch(
        request: Request,
        env: any,
        ctx: ExecutionContext
      ): Promise<Response> {
        if (request.method === 'POST') {
          try {
            const url = new URL(request.url);
            const code = request.headers.get('X-Code')!;
            if (url.pathname === '/instruction') {
              const values: Uint8Array[] = [];
              for await (const value of request.body!) {
                values.push(value);
              }
              const buffer = await new Blob(values).arrayBuffer(),
                params = JSON.parse(new TextDecoder().decode(buffer));
              paramsMap[code] = params;
              return new Response();
            } else if (url.pathname === '/data') {
              const params = paramsMap[code];
              delete paramsMap[code];
              const proxy = ProxyFactory.getProxy(params, request.body),
                response = await proxy.execute(env);
              return response;
            }
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
