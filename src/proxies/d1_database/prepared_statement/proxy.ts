import { ProxyType } from '../../../data';
import { ProxyHolder } from '../../proxy';
import { D1DatabasePreparedStatementAllProxy } from './all/proxy';
import { D1DatabasePreparedStatementFirstProxy } from './first/proxy';
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
  async first<T = unknown>(colName?: string | undefined): Promise<T> {
    const { host, name, query, values } = this,
      proxy = new D1DatabasePreparedStatementFirstProxy({
        proxyType: ProxyType.D1DatabasePreparedStatementFirst,
        host,
        name,
        query,
        values,
        colName,
      }),
      result = await proxy.post<T>();
    return result;
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
  async all<T = unknown>(): Promise<D1Result<T>> {
    const { host, name, query, values } = this,
      proxy = new D1DatabasePreparedStatementAllProxy({
        proxyType: ProxyType.D1DatabasePreparedStatementAll,
        host,
        name,
        query,
        values,
      }),
      result = await proxy.post<D1Result<T>>();
    return result;
  }
  raw<T = unknown>(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}

export { D1DatabasePreparedStatementProxy };
