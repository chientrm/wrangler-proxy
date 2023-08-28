import { Data } from '../data';
import { ProxyHolder } from './proxy_holder';

const checkOk = async (response: Response) => {
  if (!response.ok) {
    throw new Error(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        message: await response.text(),
      })
    );
  }
};

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
      code = Math.floor(Math.random() * 1000000).toString(),
      response1 = await fetch(`${host!}/instruction`, {
        method: 'POST',
        headers: { 'X-Code': code },
        body: JSON.stringify({ name, proxyType, metadata }),
        // @ts-ignore
        duplex: 'half',
      });
    await checkOk(response1);
    const response2 = await fetch(`${host!}/data`, {
      method: 'POST',
      headers: { 'X-Code': code },
      body: data,
      // @ts-ignore
      duplex: 'half',
    });
    await checkOk(response2);
    return this.receive(response2);
  }
  abstract execute(env: any): Promise<Response>;
  abstract receive(response: Response): Promise<any>;
}

export { Proxy, ProxyHolder };
