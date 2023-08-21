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
import { createD1 } from 'cf-workers-proxy';

export const handle = ({ event, resolve }) => {
  event.locals.D1 = event.platform?.env?.D1 ?? createD1('D1');
  // createD1('D1', { hostname: 'http://127.0.0.1:{default_port_is_8787}' });
  return resolve(event);
};
```
