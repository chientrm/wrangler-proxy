import { stringInit } from '../../../data';
import { Proxy } from '../../proxy';

interface Metadata {
  key: string;
  options?: KVNamespaceGetOptions<any>;
}

export class KVGetProxy extends Proxy<Metadata> {
  static readonly proxyType = 'KVGetProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = KVGetProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      { key, options } = metadata,
      kv = env[name] as KVNamespace,
      result = await kv.get(key, options);
    return new Response(result, stringInit);
  }
  receive(response: Response): Promise<any> {
    return response.text();
  }
}
