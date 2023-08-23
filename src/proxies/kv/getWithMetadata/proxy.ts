import { jsonInit } from '../../../data';
import { Proxy } from '../../proxy';

interface Metadata<Key extends string = string> {
  key: Key;
  options?: KVNamespaceGetOptions<any>;
}

export class KVGetWithMetadataProxy extends Proxy<Metadata> {
  static readonly proxyType = 'KVGetWithMetadataProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = KVGetWithMetadataProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      { key, options } = metadata,
      kv = env[name] as KVNamespace,
      result = await kv.getWithMetadata(key, options);
    return new Response(JSON.stringify(result), jsonInit);
  }
  receive(response: Response): Promise<any> {
    return response.json();
  }
}
