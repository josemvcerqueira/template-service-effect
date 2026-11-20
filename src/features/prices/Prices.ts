import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { PriceNotFound } from "@/data/api/prices/errors";
import type { Ticker } from "@/data/api/prices/schemas";

/** Looks up the latest price of a ticker, in integer cents. */
export class Prices extends Context.Service<
  Prices,
  { readonly latestCents: (ticker: Ticker) => Effect.Effect<number, PriceNotFound> }
>()("ts-service/features/prices/Prices") {
  static readonly layerFromTable = (table: ReadonlyMap<string, number>) =>
    Layer.succeed(
      Prices,
      Prices.of({
        latestCents: Effect.fn("Prices.latestCents")(function* (ticker: Ticker) {
          const cents = table.get(ticker);
          if (cents === undefined) {
            return yield* new PriceNotFound({ ticker });
          }
          return cents;
        }),
      }),
    );

  static readonly layer = Prices.layerFromTable(new Map([["SUI", 412]]));
}
