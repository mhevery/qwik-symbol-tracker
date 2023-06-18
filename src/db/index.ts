import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const db = drizzle(new Database(".db/sqlite.db"));

export async function getDB() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  return db;
}
