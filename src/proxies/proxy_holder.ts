import { Data } from '../data';

abstract class ProxyHolder<T> {
  host?: string;
  name: string;
  metadata: T;
  data: Data;
  constructor({
    host,
    name,
    metadata,
    data,
  }: {
    host?: string;
    name: string;
    metadata: T;
    data: Data;
  }) {
    this.host = host;
    this.name = name;
    this.metadata = metadata;
    this.data = data;
  }
}

export { ProxyHolder };
