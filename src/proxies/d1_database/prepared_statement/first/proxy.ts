import { Proxy } from '../../../proxy';

interface Payload {
  query: string;
  values?: any[];
  colName?: string;
}

class D1DatabasePreparedStatementFirstProxy extends Proxy<Payload> {
  static readonly proxyType = 'D1DatabasePreparedStatementFirstProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = D1DatabasePreparedStatementFirstProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  async execute(env: any): Promise<any> {
    const d1 = env[this.name] as D1Database,
      { query, values, colName } = this.payload!,
      statement1 = d1.prepare(query).bind(...(values ?? [])),
      statement2 = colName ? statement1.first(colName) : statement1.first(),
      result = await statement2;
    return result;
  }
}

export { D1DatabasePreparedStatementFirstProxy };
