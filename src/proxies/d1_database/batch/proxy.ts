import { jsonInit } from '../../../data';
import { Proxy } from '../../proxy';
import {
  D1DatabasePreparedStatementMetadata,
  D1DatabasePreparedStatementProxy,
} from '../prepared_statement/proxy';

class D1DatabaseBatchProxy extends Proxy<
  D1DatabasePreparedStatementMetadata[]
> {
  static readonly proxyType = 'D1DatabaseBatchProxy';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: D1DatabasePreparedStatementMetadata[];
  }) {
    const proxyType = D1DatabaseBatchProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  async execute(env: any) {
    const { name, metadata } = this,
      d1 = env[name] as D1Database,
      preparedStatements = metadata.map((metadata) =>
        new D1DatabasePreparedStatementProxy({
          name,
          metadata,
          data: null,
        }).statement(d1)
      ),
      result = await d1.batch(preparedStatements);
    return new Response(JSON.stringify(result), jsonInit);
  }
  receive(response: Response): Promise<any> {
    return response.json();
  }
}

export { D1DatabaseBatchProxy };
