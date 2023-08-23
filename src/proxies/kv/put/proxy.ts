import { Data } from '../../../data';
import { Proxy } from '../../proxy';

interface Metadata {
  key: string;
  options?: KVNamespacePutOptions;
}

export class KVPutProxy extends Proxy<Metadata> {
  static readonly proxyType = 'KVPutProxy';
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
    const proxyType = KVPutProxy.proxyType;
    super({ proxyType, host, name, metadata, data });
  }
  async execute(env: any) {
    const { name, metadata, data } = this,
      { key, options } = metadata,
      kv = env[name] as KVNamespace,
      value = data!;
    await kv.put(key, value, options);
    return new Response();
  }
  receive(response: Response): Promise<any> {
    return Promise.resolve();
  }
}
