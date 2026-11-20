import * as Schema from "effect/Schema";

/** What GET /health answers. */
export class Health extends Schema.Class<Health>("Health")({
  status: Schema.Literal("ok"),
  time: Schema.String,
}) {}
