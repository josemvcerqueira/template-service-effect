import * as BunHttpServer from "@effect/platform-bun/BunHttpServer";

/** The Bun HTTP server. Routes are provided by src/app. */
export const serverLayer = (options: { readonly hostname: string; readonly port: number }) =>
  BunHttpServer.layer(options);
