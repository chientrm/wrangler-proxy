abstract class ProxyHolder<T> {
  host?: string;
  name: string;
  payload: T;
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: T;
  }) {
    this.host = host;
    this.name = name;
    this.payload = payload;
  }
}

export { ProxyHolder };
