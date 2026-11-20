# template-service-effect

The starter for new Bun services written with Effect v4. For services without Effect, use [template-service](https://github.com/josemvcerqueira/template-service). On GitHub press **Use this template**, then rename `ts-service` in `package.json`, `AGENTS.md`, the service keys in `src/` and the API title in `src/data/api/Api.ts`. Rules come from [`@interest-protocol/standards`](https://github.com/josemvcerqueira/standards) at a pinned tag: bump the tag to get rule updates, never copy rules into this repo.

```sh
bun install
bun run dev      # GET /health, GET /prices/SUI, OpenAPI at /openapi.json, docs at /docs
bun run gate     # verify, oxfmt, oxlint, tsc, Effect diagnostics, knip, bun test: the merge check
```

After the first push, make the gate required on `main` (needs repo admin):

```sh
gh api -X POST repos/OWNER/REPO/rulesets --input .github/ruleset.json
```

Included: a schema-first `HttpApi` (contract in `src/data/api`, handlers in `src/features`, OpenAPI and Scalar docs), a service with a static layer and a typed `PriceNotFound` (404), `Config`-based settings, JSON logs through Effect's `Logger`, `BunRuntime.runMain` with graceful shutdown, and handler tests through `HttpApiTest` with `TestClock`. The standard's `oxlint/effect.json` and `tsconfig.effect.json` enforce Effect v4 usage, tree-shakable imports and the API layout; the Effect language service runs in the gate and in the Claude hooks. See STANDARD.md#effect.
