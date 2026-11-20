import { describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpServer from "effect/http/HttpServer";
import * as HttpApiTest from "effect/http-api/HttpApiTest";
import { Api } from "@/data/api/Api";
import { Ticker } from "@/data/api/prices/schemas";
import { Prices } from "./Prices";
import { PricesHandlers } from "./handlers";

const TestLayer = Layer.mergeAll(
  PricesHandlers.pipe(Layer.provide(Prices.layerFromTable(new Map([["SUI", 412]])))),
  HttpServer.layerServices,
);

const getPrice = Effect.fn("getPrice")(
  function* (ticker: string) {
    const client = yield* HttpApiTest.groups(Api, ["prices"]);
    return yield* client.prices.get({ params: { ticker: Ticker.make(ticker) } });
  },
  Effect.scoped,
  Effect.provide(TestLayer),
);

describe("GET /prices/:ticker", () => {
  it("answers the price in cents and formatted", async () => {
    const price = await Effect.runPromise(getPrice("SUI"));
    expect(price).toMatchObject({ ticker: "SUI", cents: 412, display: "4.12" });
  });

  it("fails with PriceNotFound for an unknown ticker", async () => {
    const error = await Effect.runPromise(Effect.flip(getPrice("BTC")));
    expect(error._tag).toBe("PriceNotFound");
  });
});
