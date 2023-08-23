import { Data } from '../data';
import { ProxyHolder } from './proxy_holder';

abstract class Proxy<T> extends ProxyHolder<T> {
  proxyType: string;
  constructor({
    host,
    name,
    proxyType,
    metadata,
    data,
  }: {
    host?: string;
    name: string;
    proxyType: string;
    metadata: T;
    data: Data;
  }) {
    super({ host, name, metadata, data });
    this.proxyType = proxyType;
  }
  async post() {
    const { host, name, proxyType, metadata, data } = this,
      params = new URLSearchParams({
        name,
        proxyType,
        metadata: JSON.stringify(metadata),
      }),
      method = 'POST',
      response = await fetch(`${host!}?${params}`, {
        method,
        body: data,
        // @ts-ignore
        duplex: 'half',
      });
    if (response.ok) {
      return this.receive(response);
    } else {
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          message: await response.text(),
        })
      );
    }
  }
  abstract execute(env: any): Promise<Response>;
  abstract receive(response: Response): Promise<any>;
}

export { Proxy, ProxyHolder };
