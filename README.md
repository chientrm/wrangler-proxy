# wrangler-proxy

[![Download](https://img.shields.io/npm/dt/wrangler-proxy)](https://www.npmjs.com/package/wrangler-proxy)
[![Version](https://img.shields.io/npm/v/wrangler-proxy)](https://github.com/chientrm/wrangler-proxy)

Wrangler Proxy exposes Workers API to outside and integrate to your favorite frameworks. Compatible with DrizzleORM.

## Quick links

- [Get Started](#get-started)
  - [Install](#install)
  - [Setup `wrangler.toml`](#example-wranglertoml)
  - [Setup proxy for dev](#start-proxy-for-dev)
    - [Remote mode](#remote-mode)
    - [Local mode](#local-mode)
  - [Setup SvelteKit project](#example-sveltekit-project)
- [Using wrangler-proxy to expose workers API](#using-wrangler-proxy-to-expose-workers-api)
- [Features](#features)

  - [D1](#d1)
    - [PreparedStatement](#preparedstatement)
  - [Service Bindings](#service-bindings)
    - [app.d.ts](#appdts)
    - [hooks.server.ts](#hooksserverts)
  - [KV](#kv)
  - [R2](#r2)
  - [waitUntil](#waituntil)
  - [Queues](#queues-😔)
  - [Hyperdrive](#hyperdrive-😔)
  - [Workers AI](#workers-ai-😔)
  - [AI Gateway](#ai-gateway-😔)
  - [Stream](#stream-😔)
  - [Images](#images-😔)

- [Contributing](#contributing)
  - [Buy Me A Coffee](https://www.buymeacoffee.com/chientrm)
  - [Donating via PayPal](https://www.paypal.me/chientrm)

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

#### Remote mode

```
wrangler dev node_modules/wrangler-proxy/dist/worker.js --remote
```

#### Local mode

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

import { connectD1 } from 'wrangler-proxy';

export const handle = ({ event, resolve }) => {
  event.locals.D1 = event.platform?.env?.D1 ?? connectD1('D1');
  // or connectD1('D1', { hostname: 'custom-host-name' });
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

## Features

- 😔 Need funding
- 🤷 Not fully tested
- ✅ Complete

### D1

```ts
import { connectD1 } from 'wrangler-proxy';
```

| Function    | Status |
| ----------- | ------ |
| `prepare()` | ✅     |
| `batch()`   | ✅     |
| `dump()`    | 😔     |
| `exec()`    | ✅     |

#### PreparedStatement

| Function  | Status |
| --------- | ------ |
| `first()` | ✅     |
| `run()`   | ✅     |
| `all()`   | ✅     |
| `raw()`   | ✅     |
| `bind()`  | ✅     |

### Service Bindings

```ts
import { connectServiceBinding } from 'wrangler-proxy';
```

| Function    | Status |
| ----------- | ------ |
| `fetch()`   | ✅     |
| `connect()` | 😔     |

#### app.d.ts

```ts
// app.d.ts

declare global {
  namespace App {
    interface Locals {
      SB: Fetcher;
    }
    interface Platform {
      env?: {
        SB: Fetcher;
      };
    }
  }
}
```

#### hooks.server.ts

```ts
/// hooks.server.ts

import { connectServiceBinding } from 'wrangler-proxy';

export const handle = async ({ resolve, event }) => {
  event.locals.SB = event.platform?.env?.SB ?? connectServiceBinding('SB');
  return resolve(event);
};
```

```ts
/// example_usage.ts

event.locals.SB.fetch('http://whatever.fake/send');

// `http://whatever.fake` is required as a dummy hostname. Without a dummy hostname the `fetch` will fail.
```

### KV

```ts
import { connectKV } from 'wrangler-proxy';
```

| Function            | Status |
| ------------------- | ------ |
| `put()`             | 🤷     |
| `get()`             | ✅     |
| `getWithMetadata()` | 🤷     |
| `delete()`          | ✅     |
| `list()`            | 🤷     |

### R2

```ts
import { connectR2 } from 'wrangler-proxy';
```

| Function                  | Status |
| ------------------------- | ------ |
| `head()`                  | 😔     |
| `get()`                   | ✅     |
| `put()`                   | ✅     |
| `createMultipartUpload()` | 😔     |
| `resumeMultipartUpload()` | 😔     |
| `delete()`                | ✅     |
| `list()`                  | 😔     |

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
    waitUntil((async () => {})(), platform?.context);
    return { message: 'success' };
  },
};
```

### Queues 😔

### Hyperdrive 😔

### Workers AI 😔

### AI Gateway 😔

### Stream 😔

### Images 😔

## Contributing

If you find this project helpful, consider supporting it by

<a href="https://www.buymeacoffee.com/chientrm" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

or

[Donating via PayPal](https://www.paypal.me/chientrm)

Your donation will help us implement your requested features faster.
