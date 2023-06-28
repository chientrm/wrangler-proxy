import { Data, ProxyType } from '../../../data';
import { Proxy } from '../../proxy';

interface ProxyData extends Data {
  query: string;
}

class D1DatabaseExecProxy extends Proxy<ProxyData> {
  static create(data: Data) {
    return new D1DatabaseExecProxy(data as ProxyData);
  }
  getData(): ProxyData {
    const { host, name, query } = this;
    return {
      proxyType: ProxyType.D1DatabaseExec,
      host,
      name,
      query,
    };
  }
  query: string;
  constructor({
    host,
    name,
    query,
  }: {
    host?: string;
    name: string;
    query: string;
  }) {
    super({ host, name });
    this.query = query;
  }
  execute(env: any) {
    const d1 = env[this.name] as D1Database;
    return d1.exec(this.query);
  }
}

export { D1DatabaseExecProxy };
