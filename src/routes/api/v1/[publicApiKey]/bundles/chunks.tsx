import { eq } from "drizzle-orm";
import { symbolTable } from "../../../../../db/schema";
import { type AppDatabase } from "../../../../../db";

const SEP = " ";

export async function getBundleGrouping({
  publicApiKey,
  db,
}: {
  publicApiKey: string;
  db: AppDatabase;
}): Promise<Record<string, string>> {
  const symbols: Record<string, string> = {};
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
