import { z } from "zod";

export interface QManifest {
  symbols: Record<string, QManifestSymbol>;
  mapping: Record<string, string>[];
  bundles: Record<string, QManifestBundle>;
  injections: QManifestInjection[];
  vesion: string;
  options: QManifestOptions;
  platform: QManifestPlatform;
}

export interface QManifestSymbol {
  origin: string;
  displayName: string;
  canonicalFilename: string;
  hash: string;
  ctxKind: string; // "function" | "eventHandler";
  ctxName: string;
  capture: boolean;
  parent: string;
}

export interface QManifestBundle {
  size: number;
  imports: string[];
  origins: string[];
}

export interface QManifestInjection {
  tag: string;
  location: string;
  attributes: Record<string, string>;
}

export interface QManifestOptions {
  target: string;
  buildModule: string;
  forceFullBuild: boolean;
  entryStrategy: {
    type: string;
  };
}

export interface QManifestPlatform {
  qwik: string;
  vite: string;
  rollup: string;
  env: string;
  os: string;
  node: string;
}

/////////////////////////////

export const QManifestSymbol = z.object({
  origin: z.string(),
  displayName: z.string(),
  canonicalFilename: z.string(),
  hash: z.string(),
  ctxKind: z.string(),
  ctxName: z.string(),
  capture: z.boolean(),
  parent: z.string(),
});
QManifestSymbol._type satisfies QManifestSymbol;

export const QManifestBundle = z.object({
  size: z.number(),
  imports: z.array(z.string()),
  origins: z.array(z.string()),
});
QManifestBundle._type satisfies QManifestBundle;

export const QManifestInjection = z.object({
  tag: z.string(),
  location: z.string(),
  attributes: z.object({}),
});
QManifestInjection._type satisfies QManifestInjection;

export const QManifestOptions = z.object({
  target: z.string(),
  buildModule: z.string(),
  forceFullBuild: z.boolean(),
  entryStrategy: z.object({
    type: z.string(),
  }),
});
QManifestOptions._type satisfies QManifestOptions;

export const QManifestPlatform = z.object({
  qwik: z.string(),
  vite: z.string(),
  rollup: z.string(),
  env: z.string(),
  os: z.string(),
  node: z.string(),
});

QManifestPlatform._type satisfies QManifestPlatform;
