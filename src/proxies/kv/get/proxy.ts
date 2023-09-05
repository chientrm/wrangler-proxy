import { Proxy } from '../../proxy';

interface Metadata {
  key: string;
  options?: unknown;
}

export class KVGetProxy extends Proxy<Metadata> {
  static readonly proxyType = 'KVGetProxy';
  static readonly nullHeader = 'X-Null';
  constructor({
    host,
    name,
    metadata,
  }: {
    host?: string;
    name: string;
    metadata: Metadata;
  }) {
    const proxyType = KVGetProxy.proxyType;
    super({ proxyType, host, name, metadata, data: null });
  }
  getType() {
    const { options } = this.metadata;
    if (options === null || options === undefined) {
      return null;
    }
    if (options === 'text') {
      return 'text';
    }
    if (options === 'json') {
      return 'json';
    }
    if (options === 'arrayBuffer') {
      return 'arrayBuffer';
    }
    if (options === 'stream') {
      return 'stream';
    }
    if (typeof options === 'object') {
      const optionsObject = options as KVNamespaceGetOptions<
        'text' | 'json' | 'arrayBuffer' | 'stream'
      >;
      if (optionsObject.type === 'text') {
        return 'text';
      }
      if (optionsObject.type === 'json') {
        return 'json';
      }
      if (optionsObject.type === 'arrayBuffer') {
        return 'arrayBuffer';
      }
      if (optionsObject.type === 'stream') {
        return 'stream';
      }
    }
    throw new Error('Unknown error');
  }
  nullRes<T>(data: T | null) {
    if (data === null) {
      return new Response(null, { headers: { [KVGetProxy.nullHeader]: '1' } });
    }
  }
  async execute(env: any) {
    const { name, metadata } = this,
      { key } = metadata,
      kv = env[name] as KVNamespace;
    let body: any = null;
    switch (this.getType()) {
      case null:
        body = await kv.get(key);
        return this.nullRes(body) ?? new Response(body);
      case 'text':
        body = await kv.get(key, 'text');
        return this.nullRes(body) ?? new Response(body);
      case 'json':
        body = await kv.get(key, 'json');
        return this.nullRes(body) ?? new Response(JSON.stringify(body));
      case 'arrayBuffer':
        body = await kv.get(key, 'arrayBuffer');
        return this.nullRes(body) ?? new Response(body);
      case 'stream':
        body = await kv.get(key, 'stream');
        return this.nullRes(body) ?? new Response(body);
    }
  }
  async receive(
    response: Response
  ): Promise<string | ArrayBuffer | ReadableStream<any> | null> {
    if (response.headers.get(KVGetProxy.nullHeader)) {
      return null;
    }
    switch (this.getType()) {
      case null:
      case 'text':
        return response.text();
      case 'json':
        return response.json();
      case 'arrayBuffer':
        return response.arrayBuffer();
      case 'stream':
        return response.body;
    }
  }
}
