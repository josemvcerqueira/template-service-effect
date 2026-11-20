# ts-service

A Bun service written with Effect v4, on the Interest Protocol house standard. Read `node_modules/@interest-protocol/standards/STANDARD.md#effect` once, and `node_modules/effect/AGENTS.md` before writing a new kind of Effect code: it matches the installed version. The lint rules and Effect diagnostics enforce the rest, and their messages tell you the fix.

## Where code goes

Adding an endpoint to group `<group>`:

1. `src/data/api/<group>/schemas.ts`: the params, payload and response schemas.
2. `src/data/api/<group>/errors.ts`: `Schema.TaggedError` classes with `{ httpApiStatus }`.
3. `src/data/api/<group>/<Group>Api.ts`: the `HttpApiEndpoint` on `HttpApiGroup.make("<group>")`.
4. `src/features/<group>/<Service>.ts`: the service (`Context.Service` with `static readonly layer`).
5. `src/features/<group>/handlers.ts`: `HttpApiBuilder.group(Api, "<group>", ...)` calling the service.
6. `src/features/<group>/handlers.test.ts`: `HttpApiTest.groups(Api, ["<group>"])` against a test layer.
7. A new group also goes in `src/data/api/Api.ts`, and its handlers and service layer in `src/app/main.ts`.

`src/config/AppConfig.ts` reads the environment with `Config`. `src/platform/` holds the Bun server, runtime and logger layers. `src/lib/` is pure helpers. Effect runs once, in `src/app/main.ts`.

Bun is the runtime, package manager and test runner: `bun install`, `bun add`, `bun test`. Never npm, pnpm or yarn. `effect` and every `@effect/*` package stay on one exact version.

## Gate

`bun run gate` (standard check, oxfmt, oxlint, tsc, Effect diagnostics, knip, bun test) is the merge check. Hooks lint and run the Effect diagnostics after every edit, and will not let you finish while the gate fails. Lint, format, compiler, hook and CI config are read-only for agents: change the code, not the rules.

## Review

A different agent reviews every PR from the diff alone. A comment that comes up twice becomes a lint rule in `@interest-protocol/standards`.

## Not allowed without Jose

Secrets in the repo, deploys, branch-protection changes.
