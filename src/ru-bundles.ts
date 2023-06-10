import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { type RouteStats } from "./types/storage";

const ROUTE_PREFIX = "ROUTE_";
const ROUTE_SUFFIX = ".json";

export async function getRUBundles(path: string) {
  console.log("========== REAL USER METRICS ==========");
  const symbols: Record<string, string> = {};
  const names = await readdir(path);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (name.startsWith(ROUTE_PREFIX) && name.endsWith(ROUTE_SUFFIX)) {
      const route = decodeURIComponent(
        name.substring(ROUTE_PREFIX.length, name.length - ROUTE_SUFFIX.length)
      );
      const buf = await readFile(join(path, name));
      const routeStats: RouteStats = JSON.parse(buf.toString());
      console.log("ROUTE:", route);
      Object.keys(routeStats.symbolStats).forEach((key) => {
        const existingKey = symbols[key];
        symbols[key] = existingKey ? existingKey + "|" + route : route;
        console.log("  ", key);
      });
    }
  }
  console.log("---------------------------------------");
  return symbols;
}
