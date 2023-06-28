import { Data, ProxyType } from '../../../../data';
import { Proxy } from '../../../proxy';

interface ProxyData extends Data {
  query: string;
  values?: any[];
}

class D1DatabasePreparedStatementRunProxy extends Proxy<ProxyData> {
  query: string;
  values?: any[];
  constructor(data: ProxyData) {
    super(data);
    this.query = data.query;
    this.values = data.values;
  }
  async execute(env: any) {
    const d1 = env[this.name] as D1Database,
      statement = d1.prepare(this.query).bind(...(this.values ?? [])),
      result = await statement.run();
    return result;
  }
  getData(): ProxyData {
    const { host, name, query, values } = this;
    return {
      proxyType: ProxyType.D1DatabasePreparedStatementRun,
      host,
      name,
      query,
      values,
    };
  }
  static create(data: Data) {
    return new D1DatabasePreparedStatementRunProxy(data as ProxyData);
  }
}

export { D1DatabasePreparedStatementRunProxy };
