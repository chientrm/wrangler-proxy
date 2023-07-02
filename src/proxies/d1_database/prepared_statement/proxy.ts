import { ProxyHolder } from '../../proxy';
import { D1DatabasePreparedStatementAllProxy } from './all/proxy';
import { D1DatabasePreparedStatementFirstProxy } from './first/proxy';
import { D1DatabasePreparedStatementRunProxy } from './run/proxy';

interface Payload {
  query: string;
  values?: any[];
}

class D1DatabasePreparedStatementProxy
  extends ProxyHolder<Payload>
  implements D1PreparedStatement
{
  bind(...values: any[]): D1DatabasePreparedStatementProxy {
    const { host, name } = this,
      { query } = this.payload!,
      payload = { query, values };
    return new D1DatabasePreparedStatementProxy({ host, name, payload });
  }
  async first<T = unknown>(colName?: string | undefined): Promise<T> {
    const { host, name } = this,
      { query, values } = this.payload,
      proxy = new D1DatabasePreparedStatementFirstProxy({
        host,
        name,
        payload: { query, values, colName },
      });
    return proxy.post<T>();
  }
  async run<T = unknown>(): Promise<D1Result<T>> {
    const { host, name } = this,
      payload = this.payload,
      proxy = new D1DatabasePreparedStatementRunProxy({ host, name, payload });
    return proxy.post<D1Result<T>>();
  }
  async all<T = unknown>(): Promise<D1Result<T>> {
    const { host, name } = this,
      payload = this.payload,
      proxy = new D1DatabasePreparedStatementAllProxy({ host, name, payload });
    return proxy.post<D1Result<T>>();
  }
  raw<T = unknown>(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}

export { D1DatabasePreparedStatementProxy };
