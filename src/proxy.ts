import { Data, ErrorResult, Result, SuccessResult } from './data';

class Proxy {
  host: string;
  name: any;
  constructor({ host, name }: { host: string; name: string }) {
    this.host = host;
    this.name = name;
  }
  async post<T>(data: Data) {
    const res = await fetch(this.host, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
      result = await res.json<Result>();
    if (result.status === 200) {
      return (result as SuccessResult<T>).data;
    } else if (result.status === 500) {
      const error = (result as ErrorResult).error;
      throw new Error(error.message);
    } else {
      throw new Error('Invalid response status code');
    }
  }
}

export { Proxy };
