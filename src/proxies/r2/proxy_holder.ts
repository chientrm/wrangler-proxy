import { R2PutOptionsExtra } from '../../data';
import { ProxyHolder } from '../proxy';
import { R2DeleteProxy } from './delete/proxy';
import { R2GetProxy } from './get/proxy';
import { R2PutProxy } from './put/proxy';

export class R2ProxyHolder extends ProxyHolder<{}> implements R2Bucket {
  head(key: string): Promise<R2Object | null> {
    throw new Error('Method not implemented.');
  }
  get(
    key: string,
    options: R2GetOptions & { onlyIf: Headers | R2Conditional }
  ): Promise<R2Object | R2ObjectBody | null>;
  get(
    key: string,
    options?: R2GetOptions | undefined
  ): Promise<R2ObjectBody | null>;
  get(
    key: unknown,
    options?: unknown
  ): Promise<R2Object | R2ObjectBody | null> | Promise<R2ObjectBody | null> {
    const { host, name } = this,
      proxy = new R2GetProxy({
        host,
        name,
        metadata: { key: key as string, options: options as R2GetOptions },
      });
    return proxy.post().then((response: Response) => {
      if (response.headers.get('wrangler-proxy-null')) {
        return null;
      }
      const result: R2ObjectBody = {
        body: response.body!,
        bodyUsed: false,
        arrayBuffer: () => response.arrayBuffer(),
        text: () => response.text(),
        json: () => response.json(),
        blob: () => response.blob(),
        key: key as string,
        version: '',
        size: 0,
        etag: '',
        httpEtag: '',
        checksums: {
          toJSON: function (): R2StringChecksums {
            throw new Error('Function not implemented.');
          },
        },
        uploaded: new Date(),
        writeHttpMetadata: function (headers: Headers): void {
          throw new Error('Function not implemented.');
        },
      };
      return result;
    });
  }
  put(
    key: string,
    value:
      | string
      | ReadableStream<any>
      | ArrayBuffer
      | ArrayBufferView
      | Blob
      | null,
    options?: (R2PutOptions & { onlyIf: Headers | R2Conditional }) | undefined
  ): Promise<R2Object | null>;
  put(
    key: string,
    value:
      | string
      | ReadableStream<any>
      | ArrayBuffer
      | ArrayBufferView
      | Blob
      | null,
    options?: R2PutOptions | undefined
  ): Promise<R2Object>;
  put(
    key: unknown,
    value: unknown,
    options?: unknown
  ): Promise<R2Object | null> | Promise<R2Object> {
    const data =
      typeof value === 'string' ||
      value instanceof ArrayBuffer ||
      value instanceof Buffer
        ? new ReadableStream({
            start(controller) {
              controller.enqueue(value);
              controller.close();
            },
          })
        : value instanceof Blob
        ? value.stream()
        : value instanceof ReadableStream
        ? value
        : undefined;
    if (typeof key !== 'string' || !data) {
      throw new Error('Method not implemented.');
    }
    const { host, name } = this;
    if (!options) {
      const proxy = new R2PutProxy({
        host,
        name,
        metadata: { key },
        data,
      });
      return proxy.post();
    } else {
      const _options = options as R2PutOptions,
        newOptions: R2PutOptionsExtra = {
          ..._options,
          onlyIfArr:
            _options.onlyIf instanceof Headers
              ? [..._options.onlyIf]
              : undefined,
          httpMetadataArr:
            _options.httpMetadata instanceof Headers
              ? [..._options.httpMetadata]
              : undefined,
        },
        proxy = new R2PutProxy({
          host,
          name,
          metadata: { key, options: newOptions },
          data,
        });
      return proxy.post();
    }
  }
  createMultipartUpload(
    key: string,
    options?: R2MultipartOptions | undefined
  ): Promise<R2MultipartUpload> {
    throw new Error('Method not implemented.');
  }
  resumeMultipartUpload(key: string, uploadId: string): R2MultipartUpload {
    throw new Error('Method not implemented.');
  }
  delete(keys: string | string[]): Promise<void> {
    const { host, name } = this,
      proxy = new R2DeleteProxy({ host, name, metadata: { keys } });
    return proxy.post();
  }
  list(options?: R2ListOptions | undefined): Promise<R2Objects> {
    throw new Error('Method not implemented.');
  }
}
