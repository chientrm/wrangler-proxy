import { Proxy } from '../../../proxy';

interface Payload {
  query: string;
  values?: any[];
}

class D1DatabasePreparedStatementRunProxy extends Proxy<Payload> {
  static readonly proxyType = 'D1DatabasePreparedStatementRunProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = D1DatabasePreparedStatementRunProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  async execute(env: any) {
    const d1 = env[this.name] as D1Database,
      { query, values } = this.payload!,
      result = await d1
        .prepare(query)
        .bind(...(values ?? []))
        .run();
    return result;
  }
}

export { D1DatabasePreparedStatementRunProxy };
