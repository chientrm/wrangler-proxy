import { ProxyType } from '../../../data';
import { ProxyHolder } from '../../proxy';
import { D1DatabasePreparedStatementRunProxy } from './run/proxy';

class D1DatabasePreparedStatementProxy
  extends ProxyHolder
  implements D1PreparedStatement
{
  values?: any[];
  query: string;

  constructor({
    host,
    name,
    query,
    values,
  }: {
    host?: string;
    name: string;
    query: string;
    values?: any[];
  }) {
    super({ host, name });
    this.query = query;
    this.values = values;
  }
  bind(...values: any[]): D1DatabasePreparedStatementProxy {
    const { host, name, query } = this;
    return new D1DatabasePreparedStatementProxy({ host, name, query, values });
  }
  first<T = unknown>(colName?: string | undefined): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async run<T = unknown>(): Promise<D1Result<T>> {
    const { host, name, query, values } = this,
      proxy = new D1DatabasePreparedStatementRunProxy({
        proxyType: ProxyType.D1DatabasePreparedStatementRun,
        host,
        name,
        query,
        values,
      }),
      result = await proxy.post<D1Result<T>>();
    return result;
  }
  all<T = unknown>(): Promise<D1Result<T>> {
    throw new Error('Method not implemented.');
  }
  raw<T = unknown>(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}

export { D1DatabasePreparedStatementProxy };
