import { Proxy } from '../../proxy';

interface Payload {
  key: string;
}

export class KVGetProxy extends Proxy<Payload> {
  static readonly proxyType = 'KVGetProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = KVGetProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  execute(env: any) {
    const { name } = this,
      { key } = this.payload,
      kv = env[name] as KVNamespace;
    return kv.get(key);
  }
}
