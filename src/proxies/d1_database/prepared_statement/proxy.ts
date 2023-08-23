import { ProxyHolder } from '../../proxy';
import { D1DatabasePreparedStatementAllProxy } from './all/proxy';
import { D1DatabasePreparedStatementFirstProxy } from './first/proxy';
import { D1DatabasePreparedStatementRawProxy } from './raw/proxy';
import { D1DatabasePreparedStatementRunProxy } from './run/proxy';

interface Metadata {
  query: string;
  values?: any[];
}

class D1DatabasePreparedStatementProxy
  extends ProxyHolder<Metadata>
  implements D1PreparedStatement
{
  bind(...values: any[]): D1DatabasePreparedStatementProxy {
    const { host, name, metadata } = this,
      { query } = metadata;
    return new D1DatabasePreparedStatementProxy({
      host,
      name,
      metadata: { query, values },
      data: null,
    });
  }
  async first<T = unknown>(colName?: string | undefined): Promise<T> {
    const { host, name, metadata } = this,
      { query, values } = metadata,
      proxy = new D1DatabasePreparedStatementFirstProxy({
        host,
        name,
        metadata: { query, values, colName },
      });
    return proxy.post();
  }
  async run<T = unknown>(): Promise<D1Result<T>> {
    const { host, name, metadata } = this,
      proxy = new D1DatabasePreparedStatementRunProxy({
        host,
        name,
        metadata,
      });
    return proxy.post();
  }
  async all<T = unknown>(): Promise<D1Result<T>> {
    const { host, name, metadata } = this,
      proxy = new D1DatabasePreparedStatementAllProxy({
        host,
        name,
        metadata,
      });
    return proxy.post();
  }
  async raw<T = unknown>(): Promise<T[]> {
    const { host, metadata, name } = this,
      { query } = metadata,
      proxy = new D1DatabasePreparedStatementRawProxy({
        host,
        name,
        metadata: { query },
      });
    return proxy.post();
  }
}

export { D1DatabasePreparedStatementProxy };
