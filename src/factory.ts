import { D1DatabaseExecProxy } from './proxies/d1_database/exec/proxy';
import { D1DatabasePreparedStatementRunProxy } from './proxies/d1_database/prepared_statement/run/proxy';
import { Data, ProxyType } from './data';

class ProxyFactory {
  public static getProxy(data: Data) {
    switch (data.proxyType) {
      case ProxyType.D1DatabasePreparedStatementRun:
        return D1DatabasePreparedStatementRunProxy.create(data);
      case ProxyType.D1DatabaseExec:
        return D1DatabaseExecProxy.create(data);
      default:
        throw new Error('Unknown proxy type.');
    }
  }
}

export { ProxyFactory };
