import { Data, R2PutOptionsExtra } from '../../../data';
import { Proxy } from '../../proxy';

interface Metadata {
  key: string;
  options?: R2PutOptionsExtra;
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
    if (options) {
      const newOptions: R2PutOptions = {
        ...options,
        onlyIf: options.onlyIfArr
          ? new Headers(options.onlyIfArr)
          : options.onlyIf,
        httpMetadata: options.httpMetadataArr
          ? new Headers(options.httpMetadataArr)
          : options.httpMetadata,
      };
      await r2.put(key, value, newOptions);
    } else {
      await r2.put(key, value);
    }
    return new Response();
  }
  receive(response: Response): Promise<any> {
    return Promise.resolve();
  }
}
