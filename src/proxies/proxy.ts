import { ErrorResult, PostData, Result, SuccessResult } from '../data';
import { ProxyHolder } from './proxy_holder';

abstract class Proxy<T> extends ProxyHolder<T> {
  proxyType: string;
  constructor({
    host,
    name,
    proxyType,
    payload,
  }: {
    host?: string;
    name: string;
    proxyType: string;
    payload: T;
  }) {
    super({ host, name, payload });
    this.proxyType = proxyType;
  }
  async post<D>() {
    const { name, proxyType } = this,
      payload = this.payload!,
      postData: PostData = { name, proxyType, payload },
      response = await fetch(this.host!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      }),
      result = await response.json<Result>();
    if (result.status === 200) {
      return (result as SuccessResult<D>).data;
    } else if (result.status === 500) {
      const error = (result as ErrorResult).error;
      throw new Error(error.message);
    } else {
      throw new Error('Invalid response status code');
    }
  }
  abstract execute(env: any): Promise<any>;
}

export { Proxy, ProxyHolder };
