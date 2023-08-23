import { jsonInit } from '../../../data';
import { Proxy } from '../../proxy';

interface Metadata {
  options?: KVNamespaceListOptions;
}

export class KVListProxy extends Proxy<Metadata> {
  static readonly proxyType = 'KVListProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = KVListProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      { options } = metadata,
      kv = env[name] as KVNamespace;
    const result = await kv.list(options);
    return new Response(JSON.stringify(result), jsonInit);
  }
  receive(response: Response): Promise<any> {
    return response.json();
  }
}
