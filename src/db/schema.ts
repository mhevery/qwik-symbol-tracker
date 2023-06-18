import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const applicationTable = sqliteTable(
  "applications",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    publicApiKey: text("public_api_key").notNull(),
  },
  (applications) => ({
    publicApiKeyIndex: uniqueIndex("publicApiKeyIndex").on(
      applications.publicApiKey
    ),
  })
);

export const symbolTable = sqliteTable("symbols", {
  id: integer("id").primaryKey(),
  publicApiKey: text("public_api_key").references(
    () => applicationTable.publicApiKey
  ),
  pathname: text("pathname").notNull(),
  interaction: integer("interaction").notNull(),
  symbol: text("symbol").notNull(),
  sessionID: text("session_id").notNull(),
  previousSymbol: text("prev_symbol"),
  timeDelta: integer("time_delta_ms").notNull(),
});
