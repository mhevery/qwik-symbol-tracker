import { eq } from "drizzle-orm";
import { getDB } from "../../../../../db";
import { symbolTable } from "../../../../../db/schema";

const SEP = " ";

export async function getBundleGrouping(
  publicApiKey: string
): Promise<Record<string, string>> {
  const symbols: Record<string, string> = {};
  const db = await getDB();
  const rows = await db
    .select()
    .from(symbolTable)
    .where(eq(symbolTable.publicApiKey, publicApiKey))
    .all();
  rows.forEach((row) => {
    const pathname = SEP + row.pathname + SEP;
    const symbol = row.symbol.split("_").pop()!;
    const existingPathname = symbols[symbol];
    if (existingPathname) {
      if (existingPathname.indexOf(pathname) === -1) {
        symbols[symbol] = existingPathname + row.pathname + SEP;
      }
    } else {
      symbols[symbol] = pathname;
    }
  });
  return symbols;
}
