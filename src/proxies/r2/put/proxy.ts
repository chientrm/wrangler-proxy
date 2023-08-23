import { Data } from '../../../data';
import { Proxy } from '../../proxy';

interface Metadata {
  key: string;
  options?: R2PutOptions;
}

export class R2PutProxy extends Proxy<Metadata> {
  static readonly proxyType = 'R2PutProxy';
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
    const proxyType = R2PutProxy.proxyType;
    super({ proxyType, host, name, metadata, data });
  }
  async execute(env: any) {
    const { name, metadata, data } = this,
      { key, options } = metadata,
      r2 = env[name] as R2Bucket,
      value = data!;
    await r2.put(key, value, options);
    return new Response();
  }
  receive(response: Response): Promise<any> {
    return Promise.resolve();
  }
}
