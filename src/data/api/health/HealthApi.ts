import * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";
import * as HttpApiGroup from "effect/http-api/HttpApiGroup";
import { Health } from "./schemas";

/** Liveness, at the root of the generated client: `client.health()`. */
export class HealthApi extends HttpApiGroup.make("health", { topLevel: true }).add(
  HttpApiEndpoint.get("health", "/health", { success: Health }),
) {}
