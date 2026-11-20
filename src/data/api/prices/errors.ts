import * as Schema from "effect/Schema";
import { Ticker } from "./schemas";

/** The ticker has no price. Answers 404. */
export class PriceNotFound extends Schema.TaggedError<PriceNotFound>()(
  "PriceNotFound",
  { ticker: Ticker },
  { httpApiStatus: 404 },
) {}
