import { Proxy } from '../../proxy';

interface Payload {
  key: string;
  value: string;
}

export class KVPutProxy extends Proxy<Payload> {
  static readonly proxyType = 'KVPutProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = KVPutProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  execute(env: any) {
    const { name } = this,
      { key, value } = this.payload,
      kv = env[name] as KVNamespace;
    return kv.put(key, value);
  }
}
