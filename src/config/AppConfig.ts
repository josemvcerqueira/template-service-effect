import * as Config from "effect/Config";
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";
import type * as LogLevel from "effect/LogLevel";

/** Settings read from the environment once, when the app's layers are built. */
export class AppConfig extends Context.Service<
  AppConfig,
  { readonly hostname: string; readonly port: number; readonly logLevel: LogLevel.LogLevel }
>()("ts-service/config/AppConfig") {
  static readonly layer = Layer.effect(
    AppConfig,
    Config.all({
      hostname: Config.String("HOST").pipe(Config.withDefault("0.0.0.0")),
      port: Config.Port("PORT").pipe(Config.withDefault(3000)),
      logLevel: Config.LogLevel("LOG_LEVEL").pipe(Config.withDefault("Info")),
    }),
  );
}
