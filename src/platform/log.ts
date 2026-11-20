import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import type * as LogLevel from "effect/LogLevel";
import * as References from "effect/References";

/** One JSON line per log entry on stdout, at or above `level`. Product code logs with Effect.log*. */
export const logLayer = (level: LogLevel.LogLevel) =>
  Layer.mergeAll(
    Logger.layer([Logger.consoleJson]),
    Layer.succeed(References.MinimumLogLevel, level),
  );
