import { ProxyHolder } from '../proxy_holder';
import { FetcherFetchProxy } from './fetch/proxy';

class FetcherProxyHolder extends ProxyHolder<{}> implements Fetcher {
  async fetch(
    input: RequestInfo<unknown, CfProperties<unknown>>,
    init?: RequestInit<CfProperties<unknown>> | undefined
  ): Promise<Response> {
    const data =
      typeof init?.body === 'string' || init?.body instanceof ArrayBuffer
        ? new ReadableStream({
            start(controller) {
              controller.enqueue(init.body);
              controller.close();
            },
          })
        : init?.body instanceof ReadableStream
        ? init.body
        : undefined;
    if (!data) {
      throw new Error(
        `Method not implemented for body type ${typeof init?.body}`
      );
    }
    const { host, name } = this,
      path = input.toString(),
      method = init?.method,
      headers = init?.headers ? Object.entries(init.headers) : [],
      proxy = new FetcherFetchProxy({
        host,
        name,
        metadata: { path, method, headers },
        data,
      });
    return proxy.post();
  }
  connect(
    address: string | SocketAddress,
    options?: SocketOptions | undefined
  ): Socket {
    throw new Error('Method not implemented.');
  }
}

export { FetcherProxyHolder };
