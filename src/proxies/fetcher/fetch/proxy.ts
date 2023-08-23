import { Data } from '../../../data';
import { Proxy } from '../../proxy';

interface Metadata {
  path: string;
  method?: string;
  headers: [key: string, value: string][];
}

class FetcherFetchProxy extends Proxy<Metadata> {
  static readonly proxyType = 'FetcherFetchProxy';
  constructor({
    host,
    name,
    metadata,
    data,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
    data: Data;
  }) {
    const proxyType = FetcherFetchProxy.proxyType;
    super({ proxyType, host, name, metadata, data });
  }
  async execute(env: any): Promise<any> {
    const { name, metadata, data } = this,
      { path, method, headers } = metadata,
      fetcher = env[name] as Fetcher,
      response = await fetcher.fetch(path, {
        method,
        headers,
        body: data,
      });
    return response;
  }
  receive(response: Response): Promise<any> {
    return Promise.resolve(response);
  }
}

export { FetcherFetchProxy };
