import { Data, ProxyType } from '../../../../data';
import { Proxy } from '../../../proxy';

interface ProxyData extends Data {
  query: string;
  values?: any[];
  colName?: string;
}

class D1DatabasePreparedStatementAllProxy extends Proxy<ProxyData> {
  query: string;
  values?: any[];
  constructor(data: ProxyData) {
    super(data);
    const { query, values } = data;
    this.query = query;
    this.values = values;
  }
  getData(): ProxyData {
    const { host, name, query, values } = this;
    return {
      proxyType: ProxyType.D1DatabasePreparedStatementFirst,
      host,
      name,
      query,
      values,
    };
  }
  async execute(env: any): Promise<any> {
    const d1 = env[this.name] as D1Database,
      statement = d1.prepare(this.query).bind(...(this.values ?? [])),
      result = await statement.all();
    return result;
  }
  static create(data: Data) {
    return new D1DatabasePreparedStatementAllProxy(data as ProxyData);
  }
}

export { D1DatabasePreparedStatementAllProxy };
