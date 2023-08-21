import { Proxy } from '../../../proxy';

interface Payload {
  query: string;
}

class D1DatabasePreparedStatementRawProxy extends Proxy<Payload> {
  static readonly proxyType = 'D1DatabasePreparedStatementRawProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = D1DatabasePreparedStatementRawProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  async execute(env: any) {
    const d1 = env[this.name] as D1Database,
      { query } = this.payload!,
      result = await d1.prepare(query).raw();
    return result;
  }
}

export { D1DatabasePreparedStatementRawProxy };
