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

enum ProxyType {
  D1DatabasePreparedStatementRun,
  D1DatabasePreparedStatementFirst,
  D1DatabaseExec,
}

interface Data {
  proxyType: ProxyType;
  host?: string;
  name: string;
}

interface RunPreparedStatement extends Data {
  action: 'runPreparedStatement';
  name: string;
  query: string;
  values: any[] | undefined;
}

export { ProxyType };
export type { Data, ErrorResult, Result, RunPreparedStatement, SuccessResult };
