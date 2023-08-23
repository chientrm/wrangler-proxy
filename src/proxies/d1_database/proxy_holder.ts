import { ProxyHolder } from '../proxy';
import { D1DatabaseExecProxy } from './exec/proxy';
import { D1DatabasePreparedStatementProxy } from './prepared_statement/proxy';

class D1DatabaseProxyHolder extends ProxyHolder<{}> implements D1Database {
  prepare(query: string): D1PreparedStatement {
    const { host, name } = this;
    return new D1DatabasePreparedStatementProxy({
      host,
      name,
      metadata: { query },
      data: null,
    });
  }
  dump(): Promise<ArrayBuffer> {
    throw new Error('Method not implemented.');
  }
  batch<T = unknown>(
    statements: D1PreparedStatement[]
  ): Promise<D1Result<T>[]> {
    throw new Error('Method not implemented.');
  }
  async exec(query: string) {
    const { host, name } = this,
      proxy = new D1DatabaseExecProxy({ host, name, metadata: { query } });
    return proxy.post();
  }
}

export { D1DatabaseProxyHolder };
