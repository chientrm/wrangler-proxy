import { Proxy } from '../../proxy';

interface Metadata {
  keys: string | string[];
}

export class R2DeleteProxy extends Proxy<Metadata> {
  static readonly proxyType = 'R2DeleteProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = R2DeleteProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      { keys } = metadata,
      r2 = env[name] as R2Bucket;
    await r2.delete(keys);
    return new Response();
  }
  receive(response: Response): Promise<any> {
    return Promise.resolve();
  }
}
