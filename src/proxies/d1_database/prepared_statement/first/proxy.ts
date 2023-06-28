import { Data, ProxyType } from '../../../../data';
import { Proxy } from '../../../proxy';

interface ProxyData extends Data {
  query: string;
  values?: any[];
  colName?: string;
}

class D1DatabasePreparedStatementFirstProxy extends Proxy<ProxyData> {
  query: string;
  values?: any[];
  colName?: string;
  constructor(data: ProxyData) {
    super(data);
    const { query, values, colName } = data;
    this.query = query;
    this.values = values;
    this.colName = colName;
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
      result = await statement.first(this.colName);
    return result;
  }
  static create(data: Data) {
    return new D1DatabasePreparedStatementFirstProxy(data as ProxyData);
  }
}

export { D1DatabasePreparedStatementFirstProxy };
