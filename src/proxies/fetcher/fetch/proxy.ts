import { Proxy } from '../../proxy';

interface Payload {
  path: string;
  method?: string;
  body: string;
}

class FetcherFetchProxy extends Proxy<Payload> {
  static readonly proxyType = 'FetcherFetchProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = FetcherFetchProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  async execute(env: any): Promise<any> {
    const { name } = this,
      { path, body, method } = this.payload,
      fetcher = env[name] as Fetcher,
      result = await fetcher.fetch(path, {
        body,
        method,
        headers: { 'content-type': 'application/json' },
      });
    return result;
  }
}

export { FetcherFetchProxy };
