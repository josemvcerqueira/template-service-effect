import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpRouter from "effect/http/HttpRouter";
import * as HttpApiBuilder from "effect/http-api/HttpApiBuilder";
import * as HttpApiScalar from "effect/http-api/HttpApiScalar";
import { AppConfig } from "@/config/AppConfig";
import { Api } from "@/data/api/Api";
import { HealthHandlers } from "@/features/health/handlers";
import { Prices } from "@/features/prices/Prices";
import { PricesHandlers } from "@/features/prices/handlers";
import { logLayer } from "@/platform/log";
import { runMain } from "@/platform/runtime";
import { serverLayer } from "@/platform/server";

const ApiRoutes = HttpApiBuilder.layer(Api, { openapiPath: "/openapi.json" }).pipe(
  Layer.provide([HealthHandlers, PricesHandlers.pipe(Layer.provide(Prices.layer))]),
);

const DocsRoutes = HttpApiScalar.layerCdn(Api, { path: "/docs", version: "1.43.5" });

const Main = Layer.unwrap(
  Effect.gen(function* () {
    const { hostname, port, logLevel, docsEnabled } = yield* AppConfig;
    const routes = docsEnabled ? Layer.mergeAll(ApiRoutes, DocsRoutes) : ApiRoutes;
    return HttpRouter.serve(routes).pipe(
      Layer.provide(serverLayer({ hostname, port })),
      Layer.provide(logLayer(logLevel)),
    );
  }),
).pipe(Layer.provide(AppConfig.layer));

Layer.launch(Main).pipe(runMain);
