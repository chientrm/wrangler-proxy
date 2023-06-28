interface Data {
  action: 'runPreparedStatement';
}

interface RunPreparedStatement extends Data {
  action: 'runPreparedStatement';
  name: string;
  query: string;
  values: any[] | undefined;
}

export type { Data, RunPreparedStatement };
