import { jsonInit } from '../../../../data';
import { Proxy } from '../../../proxy';

interface Metadata {
  query: string;
  values?: any[];
}

class D1DatabasePreparedStatementRawProxy extends Proxy<Metadata> {
  static readonly proxyType = 'D1DatabasePreparedStatementRawProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = D1DatabasePreparedStatementRawProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      d1 = env[name] as D1Database,
      { query, values } = metadata,
      statement1 = d1.prepare(query),
      statement2 = values ? statement1.bind(...values) : statement1,
      result = await statement2.raw();
    return new Response(JSON.stringify(result), jsonInit);
  }
  async receive(response: Response): Promise<any> {
    return response.json();
  }
}

export { D1DatabasePreparedStatementRawProxy };
