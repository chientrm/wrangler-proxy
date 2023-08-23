import { jsonInit } from '../../../../data';
import { Proxy } from '../../../proxy';

interface Metadata {
  query: string;
  values?: any[];
}

class D1DatabasePreparedStatementAllProxy extends Proxy<Metadata> {
  static readonly proxyType = 'D1DatabasePreparedStatementAllProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = D1DatabasePreparedStatementAllProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any): Promise<any> {
    const d1 = env[this.name] as D1Database,
      { query, values } = this.metadata,
      result = await d1
        .prepare(query)
        .bind(...(values ?? []))
        .all();
    return new Response(JSON.stringify(result), jsonInit);
  }
  receive(response: Response): Promise<any> {
    return response.json();
  }
}

export { D1DatabasePreparedStatementAllProxy };
