const createWorker = <T>() => {
  return <ExportedHandler<T>>{
    async fetch(
      request: Request,
      env: T,
      ctx: ExecutionContext
    ): Promise<Response> {
      return new Response('Hello World!');
    },
  };
};

export { createWorker };
