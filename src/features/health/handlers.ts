import * as DateTime from "effect/DateTime";
import * as Effect from "effect/Effect";
import * as HttpApiBuilder from "effect/http-api/HttpApiBuilder";
import { Api } from "@/data/api/Api";
import { Health } from "@/data/api/health/schemas";

/** GET /health. The time comes from Effect's Clock, so tests can fix it with TestClock. */
export const HealthHandlers = HttpApiBuilder.group(
  Api,
  "health",
  Effect.fn(function* (handlers) {
    return handlers.handle("health", () =>
      DateTime.now.pipe(
        Effect.map((now) => new Health({ status: "ok", time: DateTime.formatIso(now) })),
      ),
    );
  }),
);
