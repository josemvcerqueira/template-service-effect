import * as Schema from "effect/Schema";

/** A ticker such as `SUI`: two to ten upper-case letters. */
export const Ticker = Schema.String.pipe(
  Schema.check(Schema.isPattern(/^[A-Z]{2,10}$/)),
  Schema.brand("Ticker"),
);
export type Ticker = typeof Ticker.Type;

/** A price in integer cents, and the same amount formatted for display. */
export class Price extends Schema.Class<Price>("Price")({
  ticker: Ticker,
  cents: Schema.Int,
  display: Schema.String,
}) {}
