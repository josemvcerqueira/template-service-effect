import { describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpServer from "effect/http/HttpServer";
import * as HttpApiTest from "effect/http-api/HttpApiTest";
import * as TestClock from "effect/testing/TestClock";
import { Api } from "@/data/api/Api";
import { HealthHandlers } from "./handlers";

describe("GET /health", () => {
  it("answers ok with the clock's time", async () => {
    const health = await Effect.runPromise(
      Effect.gen(function* () {
        yield* TestClock.setTime(Date.UTC(2026, 0, 2));
        const client = yield* HttpApiTest.groups(Api, ["health"]);
        return yield* client.health();
      }).pipe(
        Effect.scoped,
        Effect.provide(Layer.mergeAll(HealthHandlers, HttpServer.layerServices, TestClock.layer())),
      ),
    );
    expect(health).toMatchObject({ status: "ok", time: "2026-01-02T00:00:00.000Z" });
  });
});
