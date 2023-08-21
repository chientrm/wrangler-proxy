import type { ErrorResult, PostData, SuccessResult } from './data';
import { ProxyFactory } from './factory';
import { D1DatabaseProxyHolder } from './proxies/d1_database/proxy_holder';
import { FetcherProxyHolder } from './proxies/fetcher/proxy_holder';
import { KVProxyHolder } from './proxies/kv/proxy_holder';

const json = <T>(data: T) => {
    const result: SuccessResult<T> = { status: 200, data },
      response = new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      });
    return response;
  },
  error = (error: Error) => {
    const result: ErrorResult = { status: 500, error },
      response = new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      });
    return response;
  },
  createWorker = () =>
    <ExportedHandler>{
      async fetch(
        request: Request,
        env: any,
        ctx: ExecutionContext
      ): Promise<Response> {
        if (request.method === 'POST') {
          try {
            const data = await request.json<PostData>(),
              proxy = ProxyFactory.getProxy(data),
              result = await proxy.execute(env);
            return json(result);
          } catch (e: any) {
            if (e instanceof Error) {
              return error({
                name: e.name,
                message: e.message,
                stack: e.stack,
              });
            }
          }
        }
        return new Response(null, { status: 400 });
      },
    },
  createD1 = (name: string, options?: { hostname?: string }): D1Database =>
    new D1DatabaseProxyHolder({
      host: options?.hostname ?? 'http://127.0.0.1:8787',
      name,
      payload: {},
    }),
  createKV = (name: string, options?: { hostname?: string }): KVNamespace =>
    new KVProxyHolder({
      host: options?.hostname ?? 'http://127.0.0.1:8787',
      name,
      payload: {},
    }),
  createServiceBinding = (
    name: string,
    options?: { hostname?: string }
  ): Fetcher =>
    new FetcherProxyHolder({
      host: options?.hostname ?? 'http://127.0.0.1:8787',
      name,
      payload: {},
    }),
  waitUntil = (
    promise: Promise<any>,
    waitUntil?: (promise: Promise<any>) => void
  ) => {
    if (waitUntil) {
      return waitUntil(promise);
    } else {
      return promise;
    }
  };

export { createD1, createKV, createServiceBinding, createWorker, waitUntil };
