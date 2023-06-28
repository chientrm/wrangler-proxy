import { D1DatabaseProxy } from './d1';
import type { Data, RunPreparedStatement } from './data';

const json = (data: any) =>
    new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    }),
  createWorker = () =>
    <ExportedHandler>{
      async fetch(
        request: Request,
        env: any,
        ctx: ExecutionContext
      ): Promise<Response> {
        if (request.method === 'POST') {
          const data = await request.json<Data>();
          if (data.action === 'runPreparedStatement') {
            const { name, query, values } = data as RunPreparedStatement,
              d1 = env[name] as D1Database,
              result = await d1
                .prepare(query)
                .bind(...values!)
                .run();
            return json(result);
          }
        }
        return new Response(null, { status: 400 });
      },
    },
  createD1 = ({ host, name }: { host: string; name: string }): D1Database =>
    new D1DatabaseProxy({ host, name });

export { createD1, createWorker };
