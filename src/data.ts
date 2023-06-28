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

interface Data {
  action: 'runPreparedStatement';
}

interface RunPreparedStatement extends Data {
  action: 'runPreparedStatement';
  name: string;
  query: string;
  values: any[] | undefined;
}

export type { Data, ErrorResult, Result, RunPreparedStatement, SuccessResult };
