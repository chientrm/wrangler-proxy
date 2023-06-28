abstract class ProxyHolder {
  host?: string;
  name: string;
  constructor({ host, name }: { host?: string; name: string }) {
    this.host = host;
    this.name = name;
  }
}

export { ProxyHolder };
