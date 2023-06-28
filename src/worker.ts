import { D1DatabaseProxy } from './d1';
import type {
  Data,
  ErrorResult,
  RunPreparedStatement,
  SuccessResult,
} from './data';

const json = <T>(data: T) => {
    const result: SuccessResult<T> = { status: 200, data },
      response = new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      });
    return response;
  },
  error = (error: Error) => {
    const result: ErrorResult = { status: 500, error },
      response = new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      });
    return response;
  },
  createWorker = () =>
    <ExportedHandler>{
      async fetch(
        request: Request,
        env: any,
        ctx: ExecutionContext
      ): Promise<Response> {
        if (request.method === 'POST') {
          try {
            const data = await request.json<Data>();
            if (data.action === 'runPreparedStatement') {
              const { name, query, values } = data as RunPreparedStatement,
                d1 = env[name] as D1Database,
                d1Result = await d1
                  .prepare(query)
                  .bind(...values!)
                  .run();
              return json(d1Result);
            }
          } catch (e: any) {
            if (e instanceof Error) {
              return error({
                name: e.name,
                message: e.message,
                stack: e.stack,
              });
            }
          }
        }
        return new Response(null, { status: 400 });
      },
    },
  createD1 = ({ host, name }: { host: string; name: string }): D1Database =>
    new D1DatabaseProxy({ host, name });

export { createD1, createWorker };
