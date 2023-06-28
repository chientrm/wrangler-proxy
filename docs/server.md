# Start proxy server

## Init wrangler project

```sh
npm create cloudflare@2 -- .
```

## Install proxy server

```sh
npm install -D cf-workers-proxy
```

## Replace `source/worker.ts`

```ts
import { createWorker } from 'cf-workers-proxy';

export default createWorker();
```

## Binding resources `wrangler.toml`

```toml
name = "<worker-name>"
main = "src/worker.ts"
compatibility_date = "2023-06-28"

// Bind your resources here
```

## Start proxy server

```sh
npm start
```
