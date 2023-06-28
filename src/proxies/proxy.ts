import { Data, ErrorResult, Result, SuccessResult } from '../data';
import { ProxyHolder } from './proxy_holder';

abstract class Proxy<T extends Data> extends ProxyHolder {
  async post<D>() {
    const data = this.getData(),
      res = await fetch(this.host!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
      result = await res.json<Result>();
    if (result.status === 200) {
      return (result as SuccessResult<D>).data;
    } else if (result.status === 500) {
      const error = (result as ErrorResult).error;
      throw new Error(error.message);
    } else {
      throw new Error('Invalid response status code');
    }
  }
  abstract getData(): T;
  abstract execute(env: any): Promise<any>;
}

export { Proxy, ProxyHolder };
