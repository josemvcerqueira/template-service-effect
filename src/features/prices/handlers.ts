import * as Effect from "effect/Effect";
import * as HttpApiBuilder from "effect/http-api/HttpApiBuilder";
import { Api } from "@/data/api/Api";
import { Price } from "@/data/api/prices/schemas";
import { formatCents } from "@/lib/cents";
import { Prices } from "./Prices";

/** GET /prices/:ticker. Needs a Prices layer; src/app provides the real one, tests provide their own. */
export const PricesHandlers = HttpApiBuilder.group(
  Api,
  "prices",
  Effect.fn(function* (handlers) {
    const prices = yield* Prices;
    return handlers.handle("get", ({ params }) =>
      prices.latestCents(params.ticker).pipe(
        Effect.map(
          (cents) => new Price({ ticker: params.ticker, cents, display: formatCents(cents) }),
        ),
        Effect.tap(() => Effect.logInfo("price served")),
        Effect.annotateLogs({ ticker: params.ticker }),
      ),
    );
  }),
);
