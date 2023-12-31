import { jsonInit } from '../../../data';
import { Proxy } from '../../proxy';

interface Metadata {
  query: string;
}

class D1DatabaseExecProxy extends Proxy<Metadata> {
  static readonly proxyType = 'D1DatabaseExecProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = D1DatabaseExecProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      { query } = metadata,
      d1 = env[name] as D1Database,
      result = await d1.exec(query);
    return new Response(JSON.stringify(result), jsonInit);
  }
  receive(response: Response): Promise<any> {
    return response.json();
  }
}

export { D1DatabaseExecProxy };
