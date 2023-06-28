import { ProxyHolder } from '../proxy';
import { D1DatabaseExecProxy } from './exec/proxy';
import { D1DatabasePreparedStatementProxy } from './prepared_statement/proxy';

class D1DatabaseProxyHolder extends ProxyHolder implements D1Database {
  prepare(query: string): D1PreparedStatement {
    const { host, name } = this;
    return new D1DatabasePreparedStatementProxy({ host, name, query });
  }
  dump(): Promise<ArrayBuffer> {
    throw new Error('Method not implemented.');
  }
  batch<T = unknown>(
    statements: D1PreparedStatement[]
  ): Promise<D1Result<T>[]> {
    throw new Error('Method not implemented.');
  }
  async exec<T = unknown>(query: string): Promise<D1Result<T>> {
    const { host, name } = this;
    const proxy = new D1DatabaseExecProxy({ host, name, query });
    const result = await proxy.post<D1Result<T>>();
    return result;
  }
}

export { D1DatabaseProxyHolder };
