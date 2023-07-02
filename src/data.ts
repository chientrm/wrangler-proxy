interface Result {
  status: 200 | 500;
}

interface SuccessResult<T> extends Result {
  status: 200;
  data: T;
}

interface ErrorResult extends Result {
  status: 500;
  error: Error;
}

interface PostData {
  proxyType: string;
  name: string;
  payload: any;
}

export type { ErrorResult, PostData, Result, SuccessResult };
