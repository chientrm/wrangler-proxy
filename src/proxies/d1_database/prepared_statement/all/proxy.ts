import { Proxy } from '../../../proxy';

interface Payload {
  query: string;
  values?: any[];
}

class D1DatabasePreparedStatementAllProxy extends Proxy<Payload> {
  static readonly proxyType = 'D1DatabasePreparedStatementAllProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = D1DatabasePreparedStatementAllProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  async execute(env: any): Promise<any> {
    const d1 = env[this.name] as D1Database,
      { query, values } = this.payload!,
      result = await d1
        .prepare(query)
        .bind(...(values ?? []))
        .all();
    return result;
  }
}

export { D1DatabasePreparedStatementAllProxy };
