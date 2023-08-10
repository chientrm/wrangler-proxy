import { ProxyHolder } from '../proxy';
import { KVGetProxy } from './get/proxy';
import { KVPutProxy } from './put/proxy';

interface Payload {}

export class KVProxyHolder<Key extends string = string>
  extends ProxyHolder<Payload>
  implements KVNamespace<Key>
{
  get(
    key: Key,
    options?: Partial<KVNamespaceGetOptions<undefined>> | undefined
  ): Promise<string | null>;
  get(key: Key, type: 'text'): Promise<string | null>;
  get<ExpectedValue = unknown>(
    key: Key,
    type: 'json'
  ): Promise<ExpectedValue | null>;
  get(key: Key, type: 'arrayBuffer'): Promise<ArrayBuffer | null>;
  get(key: Key, type: 'stream'): Promise<ReadableStream<any> | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<'text'> | undefined
  ): Promise<string | null>;
  get<ExpectedValue = unknown>(
    key: Key,
    options?: KVNamespaceGetOptions<'json'> | undefined
  ): Promise<ExpectedValue | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<'arrayBuffer'> | undefined
  ): Promise<ArrayBuffer | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<'stream'> | undefined
  ): Promise<ReadableStream<any> | null>;
  get<ExpectedValue = unknown>(
    key: Key,
    options?: unknown
  ):
    | Promise<string | null>
    | Promise<ArrayBuffer | null>
    | Promise<ReadableStream<any> | null>
    | Promise<ExpectedValue | null> {
    if (options) {
      throw new Error('Method not implemented.');
    }
    const { host, name } = this,
      payload = { key },
      proxy = new KVGetProxy({ host, name, payload });
    return proxy.post<string | null>();
  }
  list<Metadata = unknown>(
    options?: KVNamespaceListOptions | undefined
  ): Promise<KVNamespaceListResult<Metadata, Key>> {
    throw new Error('Method not implemented.');
  }
  put(
    key: Key,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream<any>,
    options?: KVNamespacePutOptions | undefined
  ): Promise<void> {
    if (typeof value !== 'string' || options) {
      throw new Error('Method not implemented.');
    }
    const { host, name } = this,
      payload = { key, value },
      proxy = new KVPutProxy({ host, name, payload });
    return proxy.post();
  }
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options?: Partial<KVNamespaceGetOptions<undefined>> | undefined
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: 'text'
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Key,
    type: 'json'
  ): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: 'arrayBuffer'
  ): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: 'stream'
  ): Promise<KVNamespaceGetWithMetadataResult<ReadableStream<any>, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<'text'>
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<'json'>
  ): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<'arrayBuffer'>
  ): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<'stream'>
  ): Promise<KVNamespaceGetWithMetadataResult<ReadableStream<any>, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: unknown,
    options?: unknown
  ):
    | Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>
    | Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>
    | Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>
    | Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>
    | Promise<KVNamespaceGetWithMetadataResult<ReadableStream<any>, Metadata>>
    | Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>
    | Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>
    | Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>
    | Promise<KVNamespaceGetWithMetadataResult<ReadableStream<any>, Metadata>> {
    throw new Error('Method not implemented.');
  }
  delete(key: Key): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
