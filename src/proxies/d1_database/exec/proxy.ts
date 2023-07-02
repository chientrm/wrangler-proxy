import { Proxy } from '../../proxy';

interface Payload {
  query: string;
}

class D1DatabaseExecProxy extends Proxy<Payload> {
  static readonly proxyType = 'D1DatabaseExecProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = D1DatabaseExecProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  execute(env: any) {
    const { name } = this,
      { query } = this.payload,
      d1 = env[name] as D1Database;
    return d1.exec(query);
  }
}

export { D1DatabaseExecProxy };
