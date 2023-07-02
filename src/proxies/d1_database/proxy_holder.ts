import { ProxyHolder } from '../proxy';
import { D1DatabaseExecProxy } from './exec/proxy';
import { D1DatabasePreparedStatementProxy } from './prepared_statement/proxy';

interface Payload {}

class D1DatabaseProxyHolder extends ProxyHolder<Payload> implements D1Database {
  prepare(query: string): D1PreparedStatement {
    const { host, name } = this,
      payload = { query };
    return new D1DatabasePreparedStatementProxy({ host, name, payload });
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
    const { host, name } = this,
      payload = { query },
      proxy = new D1DatabaseExecProxy({ host, name, payload });
    return proxy.post<D1Result<T>>();
  }
}

export { D1DatabaseProxyHolder };
