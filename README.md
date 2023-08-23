# wrangler-proxy

[![Download](https://img.shields.io/npm/dt/wrangler-proxy)](https://www.npmjs.com/package/wrangler-proxy)
[![Version](https://img.shields.io/npm/v/wrangler-proxy)](https://github.com/chientrm/wrangler-proxy)

Wrangler Proxy exposes Workers API to outside and integrate to your favorite frameworks. Compatible with DrizzleORM.

## Get Started

### Install

```
npm i -D wrangler-proxy
```

### Example `wrangler.toml`

```toml
name = "worker"
compatibility_date = "2023-07-02"

[[d1_databases]]
binding = "D1"
database_name = "D1"
database_id = "<d1-id>"

[[kv_namespaces]]
binding = "KV"
id = "<kv-id>"
preview_id = "<same-kv-id-as-above>"

[[services]]
binding = "WORKER"
service = "<worker-name>"
environment = "production"
```

### Start proxy for dev

Remote mode

```
wrangler dev node_modules/wrangler-proxy/dist/worker.js --remote
```

Local mode

```
wrangler dev node_modules/wrangler-proxy/dist/worker.js
```

### Example SvelteKit project

```ts
// file: app.d.ts

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

```ts
// file: src/hooks.server.ts

import { createD1 } from 'wrangler-proxy';

export const handle = ({ event, resolve }) => {
  event.locals.D1 = event.platform?.env?.D1 ?? createD1('D1');
  // or createD1('D1', { hostname: 'custom-host-name' });
  // default hostname is `http://127.0.0.1:8787`
  return resolve(event);
};
```

## Using `wrangler-proxy` to expose workers API

Init worker

```
npm create cloudflare@2 - .
```

```ts
// file: src/index.ts
import { createWorker } from 'wrangler-proxy';

export default createWorker();
```

## Roadmap

- ❌ Not started
- 🟡 Not tested
- ✅ Complete

### D1Database

```ts
import { createD1 } from 'wrangler-proxy';
```

| Function    | Status |
| ----------- | ------ |
| `prepare()` | ✅     |
| `batch()`   | ❌     |
| `dump()`    | ❌     |
| `exec()`    | ✅     |

### D1PreparedStatement

| Function  | Status |
| --------- | ------ |
| `first()` | ✅     |
| `run()`   | ✅     |
| `all()`   | ✅     |
| `raw()`   | ✅     |
| `bind()`  | ✅     |

### Service Bindings

```ts
import { createServiceBinding } from 'wrangler-proxy';
```

| Function    | Status |
| ----------- | ------ |
| `fetch()`   | ✅     |
| `connect()` | ❌     |

### KVNamespace

```ts
import { createKV } from 'wrangler-proxy';
```

| Function            | Status |
| ------------------- | ------ |
| `put()`             | 🟡     |
| `get()`             | 🟡     |
| `getWithMetadata()` | 🟡     |
| `delete()`          | 🟡     |
| `list()`            | 🟡     |

### `waitUntil`

```ts
// file: app.d.ts
namespace App {
  interface Platform {
    context: {
      waitUntil(promise: Promise<any>): void;
    };
  }
}
```

```ts
// file: +page.server.ts
import { waitUntil } from 'wrangler-proxy';

export const actions = {
  default: ({ locals, platform }) => {
    waitUntil(async () => {}, platform?.context);
    return { message: 'success' };
  },
};
```

## Contributing

<a href="https://www.buymeacoffee.com/chientrm" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

or pull request 😐
