# cf-workers-proxy

[![Download](https://img.shields.io/npm/dt/cf-workers-proxy)](https://www.npmjs.com/package/cf-workers-proxy)
[![Version](https://img.shields.io/npm/v/cf-workers-proxy)](https://github.com/chientrm/cf-workers-proxy)

Enable Cloudflare Workers runtime for local development.

## How to use?

### Setup proxy server

- [Setup Wrangler server](docs/server.md)

### Setup client

- [Setup for SvelteKit project](docs/sveltekit.md)

## Roadmap

- ❌ Not started
- 🟡 Partially implemented
- ✅ Complete

### D1Database

```ts
import { createD1 } from 'cf-workers-proxy';
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
| `raw()`   | ❌     |
| `bind()`  | ✅     |

### Service Bindings

```ts
import { createServiceBinding } from 'cf-workers-proxy';
```

| Function    | Status |
| ----------- | ------ |
| `fetch()`   | ✅     |
| `connect()` | ❌     |

### KVNamespace

```ts
import { createKV } from 'cf-workers-proxy';
```

| Function            | Status |
| ------------------- | ------ |
| `put()`             | 🟡     |
| `get()`             | 🟡     |
| `getWithMetadata()` | ❌     |
| `delete()`          | ❌     |
| `list()`            | ❌     |

## Contributing

Just pull request 😐
