import { ProxyHolder } from '../proxy';
import { KVDeleteProxy } from './delete/proxy';
import { KVGetProxy } from './get/proxy';
import { KVListProxy } from './list/proxy';
import { KVPutProxy } from './put/proxy';

export class KVProxyHolder<Key extends string = string>
  extends ProxyHolder<{}>
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
    const { host, name } = this,
      proxy = new KVGetProxy({
        host,
        name,
        metadata: {
          key,
          options: options as KVNamespaceGetOptions<any> | undefined,
        },
      });
    return proxy.post();
  }
  async list<Metadata = unknown>(
    options?: KVNamespaceListOptions | undefined
  ): Promise<KVNamespaceListResult<Metadata, Key>> {
    const { host, name } = this,
      proxy = new KVListProxy({
        host,
        name,
        metadata: { options },
      }),
      result = await proxy.post();
    return result;
  }
  async put(
    key: Key,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream<any>,
    options?: KVNamespacePutOptions | undefined
  ): Promise<void> {
    const data =
      typeof value === 'string' || value instanceof ArrayBuffer
        ? new ReadableStream({
            start(controller) {
              controller.enqueue(value);
              controller.close();
            },
          })
        : value instanceof ReadableStream
        ? value
        : undefined;
    if (!data) {
      throw new Error('Method not implemented.');
    }
    const { host, name } = this,
      proxy = new KVPutProxy({
        host,
        name,
        metadata: { key, options },
        data,
      });
    await proxy.post();
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
  async delete(key: Key): Promise<void> {
    const { host, name } = this,
      proxy = new KVDeleteProxy({ host, name, metadata: { key } });
    await proxy.post();
  }
}
