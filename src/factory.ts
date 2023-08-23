import { Data, Params } from './data';
import { D1DatabaseExecProxy } from './proxies/d1_database/exec/proxy';
import { D1DatabasePreparedStatementAllProxy } from './proxies/d1_database/prepared_statement/all/proxy';
import { D1DatabasePreparedStatementFirstProxy } from './proxies/d1_database/prepared_statement/first/proxy';
import { D1DatabasePreparedStatementRawProxy } from './proxies/d1_database/prepared_statement/raw/proxy';
import { D1DatabasePreparedStatementRunProxy } from './proxies/d1_database/prepared_statement/run/proxy';
import { FetcherFetchProxy } from './proxies/fetcher/fetch/proxy';
import { KVDeleteProxy } from './proxies/kv/delete/proxy';
import { KVGetProxy } from './proxies/kv/get/proxy';
import { KVGetWithMetadataProxy } from './proxies/kv/getWithMetadata/proxy';
import { KVListProxy } from './proxies/kv/list/proxy';
import { KVPutProxy } from './proxies/kv/put/proxy';

class ProxyFactory {
  public static getProxy(params: Params, data: Data) {
    const { proxyType, name, metadata } = params;
    switch (proxyType) {
      case D1DatabasePreparedStatementFirstProxy.proxyType:
        return new D1DatabasePreparedStatementFirstProxy({ name, metadata });
      case D1DatabasePreparedStatementRunProxy.proxyType:
        return new D1DatabasePreparedStatementRunProxy({ name, metadata });
      case D1DatabasePreparedStatementAllProxy.proxyType:
        return new D1DatabasePreparedStatementAllProxy({
          name,
          metadata,
        });
      case D1DatabasePreparedStatementRawProxy.proxyType:
        return new D1DatabasePreparedStatementRawProxy({ name, metadata });
      case D1DatabaseExecProxy.proxyType:
        return new D1DatabaseExecProxy({ name, metadata });
      case FetcherFetchProxy.proxyType:
        return new FetcherFetchProxy({ name, metadata, data });
      case KVPutProxy.proxyType:
        return new KVPutProxy({ name, metadata, data });
      case KVGetProxy.proxyType:
        return new KVGetProxy({ name, metadata });
      case KVGetWithMetadataProxy.proxyType:
        return new KVGetWithMetadataProxy({ name, metadata });
      case KVDeleteProxy.proxyType:
        return new KVDeleteProxy({ name, metadata });
      case KVListProxy.proxyType:
        return new KVListProxy({ name, metadata });
      default:
        throw new Error('Unknown proxy type.');
    }
  }
}

export { ProxyFactory };
