import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import { PriceNotFound } from "./errors";
import { Price, Ticker } from "./schemas";

/** Price lookups: `client.prices.get({ params: { ticker } })`. */
export class PricesApi extends HttpApiGroup.make("prices")
  .add(
    HttpApiEndpoint.get("get", "/:ticker", {
      params: { ticker: Ticker },
      success: Price,
      error: PriceNotFound,
    }),
  )
  .prefix("/prices") {}
