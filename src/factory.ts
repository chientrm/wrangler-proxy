import { PostData } from './data';
import { D1DatabaseExecProxy } from './proxies/d1_database/exec/proxy';
import { D1DatabasePreparedStatementAllProxy } from './proxies/d1_database/prepared_statement/all/proxy';
import { D1DatabasePreparedStatementFirstProxy } from './proxies/d1_database/prepared_statement/first/proxy';
import { D1DatabasePreparedStatementRunProxy } from './proxies/d1_database/prepared_statement/run/proxy';
import { FetcherFetchProxy } from './proxies/fetcher/fetch/proxy';
import { SendEmailProxy } from './proxies/send_email/proxy';

class ProxyFactory {
  public static getProxy(postData: PostData) {
    const { proxyType, name, payload } = postData;
    switch (proxyType) {
      case D1DatabasePreparedStatementAllProxy.proxyType:
        return new D1DatabasePreparedStatementAllProxy({ name, payload });
      case D1DatabasePreparedStatementFirstProxy.proxyType:
        return new D1DatabasePreparedStatementFirstProxy({ name, payload });
      case D1DatabasePreparedStatementRunProxy.proxyType:
        return new D1DatabasePreparedStatementRunProxy({ name, payload });
      case D1DatabaseExecProxy.proxyType:
        return new D1DatabaseExecProxy({ name, payload });
      case SendEmailProxy.proxyType:
        return new SendEmailProxy({ name, payload });
      case FetcherFetchProxy.proxyType:
        return new FetcherFetchProxy({ name, payload });
      default:
        throw new Error('Unknown proxy type.');
    }
  }
}

export { ProxyFactory };
