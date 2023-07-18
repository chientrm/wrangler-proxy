import { ProxyHolder } from '../proxy_holder';
import { FetcherFetchProxy } from './fetch/proxy';

interface Payload {}

class FetcherProxyHolder extends ProxyHolder<Payload> implements Fetcher {
  async fetch(
    input: RequestInfo<unknown, CfProperties<unknown>>,
    init?: RequestInit<CfProperties<unknown>> | undefined
  ): Promise<Response> {
    const { host, name } = this,
      path = input.toString(),
      body = init?.body,
      method = init?.method;
    if (typeof body == 'string') {
      const proxy = new FetcherFetchProxy({
        host,
        name,
        payload: { path, body, method },
      });
      const responseBody = await proxy.post<null>();
      return new Response(responseBody);
    }
    throw new Error('Method not implemented.');
  }
  connect(
    address: string | SocketAddress,
    options?: SocketOptions | undefined
  ): Socket {
    throw new Error('Method not implemented.');
  }
}

export { FetcherProxyHolder };
