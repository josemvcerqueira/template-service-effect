import * as HttpApi from "effect/http-api/HttpApi";
import * as OpenApi from "effect/http-api/OpenApi";
import { HealthApi } from "@/data/api/health/HealthApi";
import { PricesApi } from "@/data/api/prices/PricesApi";

/** The service's HTTP contract. Server handlers and typed clients are both derived from it. */
export class Api extends HttpApi.make("ts-service")
  .add(HealthApi)
  .add(PricesApi)
  .annotateMerge(OpenApi.annotations({ title: "ts-service" })) {}
