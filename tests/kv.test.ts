import { expect, test, describe, it } from 'vitest';
import { connectKV } from '../src/worker';

describe('put,get', () => {
  it('string', async () => {
    const kv = connectKV('KV');
    await kv.delete('key');
    await kv.put('key', 'value');
    expect(await kv.get('key')).toBe('value');
    await kv.delete('key');
    expect(await kv.get('key')).toBeNull();
  });

  it('json', async () => {
    const kv = connectKV('KV'),
      obj = { name: 'wrangler-proxy' };
    await kv.delete('key');
    await kv.put('key', JSON.stringify(obj));
    expect(await kv.get('key', 'json')).toEqual(obj);
    await kv.delete('key');
    expect(await kv.get('key')).toBeNull();
  });

  function str2ab(s: string) {
    var buf = new ArrayBuffer(s.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = s.length; i < strLen; i++) {
      bufView[i] = s.charCodeAt(i);
    }
    return buf;
  }

  it('arrayBuffer', async () => {
    const kv = connectKV('KV'),
      value = 'wrangler-proxy',
      buffer = str2ab(value);
    await kv.delete('key');
    await kv.put('key', buffer);
    expect(await kv.get('key', 'arrayBuffer')).toEqual(buffer);
    await kv.delete('key');
    expect(await kv.get('key')).toBeNull();
  });

  it('stream', async () => {
    const kv = connectKV('KV'),
      value = 'wrangler-proxy',
      stream = new ReadableStream({
        start(controller) {
          controller.enqueue(value);
          controller.close();
        },
      });
    await kv.delete('key');
    await kv.put('key', stream);
    const result = await new Response(await kv.get('key', 'stream')).text();
    expect(result).toEqual(value);
    await kv.delete('key');
    expect(await kv.get('key')).toBeNull();
  });
});
