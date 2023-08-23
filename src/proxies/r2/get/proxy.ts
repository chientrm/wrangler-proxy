import { Proxy } from '../../proxy';

interface Metadata {
  key: string;
  options?: R2GetOptions;
}

export class R2GetProxy extends Proxy<Metadata> {
  static readonly proxyType = 'R2GetProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = R2GetProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      { key, options } = metadata,
      r2 = env[name] as R2Bucket,
      result = await r2.get(key, options);
    if (result === null) {
      return new Response(null, { headers: { 'wrangler-proxy-null': '1' } });
    } else {
      return new Response(result.body);
    }
  }
  receive(response: Response): Promise<any> {
    return Promise.resolve(response);
  }
}
