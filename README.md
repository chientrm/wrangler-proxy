# cf-workers-proxy

Enable Cloudflare Workers runtime for local development.

## How to use?

### Setup proxy server

- [Setup Wrangler server](docs/server.md)

### Setup client

- [Setup for SvelteKit project](docs/sveltekit.md)

## Roadmap

- ❌ Not started
- ✅ Complete

### D1Database

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

### Email Routing

```ts
sendEmail = async (data : {
    seb?: SendEmail;        // Platform binding object
    sebName: string;        // send_email binding name
    name: string;           // sender name
    addr: string;           // sender address
    recipent: string;       // recipent address
    subject: string;        // raw text
    contentType: string;    // usually 'text/plain'
    data: string;
    options?: { hostname?: string };
  })
```

## Contributing

Just pull request 😐
