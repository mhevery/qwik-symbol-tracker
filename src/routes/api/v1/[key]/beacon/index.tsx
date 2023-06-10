import { type RequestHandler } from "@builder.io/qwik-city";
import { QSymbolBeaconPayload } from "~/types/beacon-API";
import { readFile, writeFile } from "fs/promises";
import { type RouteStats } from "~/types/storage";

export const onPost: RequestHandler = async ({ exit, text, request }) => {
  // console.log("API: POST: symbol");
  const payload = QSymbolBeaconPayload.parse(await request.json());
  exit();
  text(200, "OK");
  // console.log("  payload", payload);
  const publicApiKey = payload.publicApiKey;
  const route = payload.symbols[0].pathname;
  const stats = await loadStatsForRoute(publicApiKey, route);
  payload.symbols.forEach((symbol) => {
    const symbols = stats.symbolStats;
    const key = symbol.symbol.split("_").pop()!;
    const symbolState = Object.prototype.hasOwnProperty.call(symbols, key)
      ? symbols[key]
      : (symbols[key] = { symbol: key, count: 0 });
    symbolState.count++;
  });
  await saveStatsForRoute(publicApiKey, route, stats);
};

async function loadStatsForRoute(
  publicApiKey: string,
  route: string
): Promise<RouteStats> {
  const filename = getFilenameFor(publicApiKey, route);
  try {
    const buffer = await readFile(filename);
    return JSON.parse(buffer.toString());
  } catch (e) {
    return {
      route: route,
      symbolStats: {},
    };
  }
}

async function saveStatsForRoute(
  publicApiKey: string,
  route: string,
  routeStats: RouteStats
): Promise<void> {
  const filename = getFilenameFor(publicApiKey, route);
  await writeFile(filename, JSON.stringify(routeStats, null, 2));
}

function getFilenameFor(publicApiKey: string, route: string): string {
  return `.db/${publicApiKey}/ROUTE_${encodeURIComponent(route)}.json`;
}
