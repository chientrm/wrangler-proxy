import { Proxy } from '../../proxy';

interface Metadata<Key extends string = string> {
  key: Key;
}

export class KVDeleteProxy extends Proxy<Metadata> {
  static readonly proxyType = 'KvDeleteProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = KVDeleteProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      { key } = metadata,
      kv = env[name] as KVNamespace;
    await kv.delete(key);
    return new Response();
  }
  receive(response: Response): Promise<any> {
    return Promise.resolve();
  }
}
