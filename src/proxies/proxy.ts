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
      instruction = new TextEncoder().encode(
        JSON.stringify({ name, proxyType, metadata })
      ),
      instructionLength = instruction.length.toString(),
      response = await fetch(host!, {
        method: 'POST',
        headers: { 'X-Wrangler-Proxy-Length': instructionLength },
        body: new ReadableStream({
          async start(controller) {
            controller.enqueue(instruction);
            if (data) {
              for await (const value of data) {
                controller.enqueue(value);
              }
            }
            controller.close();
          },
        }),
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
