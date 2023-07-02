# Setup for SvelteKit project

## Install proxy client

```sh
npm install -D cf-workers-proxy
```

## App types

```ts
declare global {
  namespace App {
    interface Locals {
      D1: D1Database;
    }
    interface Platform {
      env?: {
        D1: D1Database;
      };
    }
  }
}

export {};
```

## Server hook `src/hooks.server.ts`

```ts
import type { Handle } from '@sveltejs/kit';
import { createD1 } from 'cf-workers-proxy';

export const handle = (async ({ event, resolve }) => {
  event.locals.D1 = event.platform?.env?.D1 ?? createD1('D1');
  return await resolve(event);
}) satisfies Handle;
```
