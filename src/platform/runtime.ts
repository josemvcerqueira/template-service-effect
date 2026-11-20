import * as BunRuntime from "@effect/platform-bun/BunRuntime";

/** Runs the app's main effect with signal handling and graceful shutdown. Called once, in src/app/main.ts. */
export const runMain = BunRuntime.runMain;
