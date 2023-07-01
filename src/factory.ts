import { Data, ProxyType } from './data';
import { D1DatabaseExecProxy } from './proxies/d1_database/exec/proxy';
import { D1DatabasePreparedStatementAllProxy } from './proxies/d1_database/prepared_statement/all/proxy';
import { D1DatabasePreparedStatementFirstProxy } from './proxies/d1_database/prepared_statement/first/proxy';
import { D1DatabasePreparedStatementRunProxy } from './proxies/d1_database/prepared_statement/run/proxy';

class ProxyFactory {
  public static getProxy(data: Data) {
    switch (data.proxyType) {
      case ProxyType.D1DatabasePreparedStatementRun:
        return D1DatabasePreparedStatementRunProxy.create(data);
      case ProxyType.D1DatabasePreparedStatementFirst:
        return D1DatabasePreparedStatementFirstProxy.create(data);
      case ProxyType.D1DatabasePreparedStatementAll:
        return D1DatabasePreparedStatementAllProxy.create(data);
      case ProxyType.D1DatabaseExec:
        return D1DatabaseExecProxy.create(data);
      default:
        throw new Error('Unknown proxy type.');
    }
  }
}

export { ProxyFactory };
