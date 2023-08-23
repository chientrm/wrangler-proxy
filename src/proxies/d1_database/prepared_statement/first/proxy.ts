import { jsonInit } from '../../../../data';
import { Proxy } from '../../../proxy';

interface Metadata {
  query: string;
  values?: any[];
  colName?: string;
}

class D1DatabasePreparedStatementFirstProxy extends Proxy<Metadata> {
  static readonly proxyType = 'D1DatabasePreparedStatementFirstProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = D1DatabasePreparedStatementFirstProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any): Promise<any> {
    const d1 = env[this.name] as D1Database,
      { query, values, colName } = this.metadata!,
      statement1 = d1.prepare(query).bind(...(values ?? [])),
      statement2 = colName ? statement1.first(colName) : statement1.first(),
      result = await statement2;
    return new Response(JSON.stringify(result), jsonInit);
  }
  receive(response: Response): Promise<any> {
    return response.json();
  }
}

export { D1DatabasePreparedStatementFirstProxy };
