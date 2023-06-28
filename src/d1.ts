import { Data, RunPreparedStatement } from './data';

class Proxy {
  host: string;
  name: any;
  constructor({ host, name }: { host: string; name: string }) {
    this.host = host;
    this.name = name;
  }
  async post<T>(data: Data) {
    const res = await fetch(this.host, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json<T>();
  }
}

class D1PreparedStatementProxy extends Proxy implements D1PreparedStatement {
  query: string;
  values?: any[];
  constructor({
    host,
    name,
    query,
    values,
  }: {
    host: string;
    name: string;
    query: string;
    values?: any[];
  }) {
    super({ host, name });
    this.query = query;
    this.values = values;
  }
  first<T = unknown>(colName?: string | undefined): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async run<T = unknown>(): Promise<D1Result<T>> {
    const name = this.name,
      query = this.query,
      values = this.values,
      data: RunPreparedStatement = {
        action: 'runPreparedStatement',
        name,
        query,
        values,
      },
      result = await this.post<D1Result<T>>(data);
    return result;
  }
  all<T = unknown>(): Promise<D1Result<T>> {
    throw new Error('Method not implemented.');
  }
  raw<T = unknown>(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  bind(...values: any[]): D1PreparedStatement {
    const host = this.host,
      name = this.name,
      query = this.query;
    return new D1PreparedStatementProxy({ host, name, query, values });
  }
}

class D1DatabaseProxy implements D1Database {
  host: string;
  name: string;
  constructor({ host, name }: { host: string; name: string }) {
    this.host = host;
    this.name = name;
  }
  dump(): Promise<ArrayBuffer> {
    throw new Error('Method not implemented.');
  }
  batch<T = unknown>(
    statements: D1PreparedStatement[]
  ): Promise<D1Result<T>[]> {
    throw new Error('Method not implemented.');
  }
  exec<T = unknown>(query: string): Promise<D1Result<T>> {
    throw new Error('Method not implemented.');
  }
  prepare(query: string): D1PreparedStatementProxy {
    const host = this.host,
      name = this.name;
    return new D1PreparedStatementProxy({ host, name, query });
  }
}

export { D1DatabaseProxy };
