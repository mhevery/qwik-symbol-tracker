// import { drizzle as _drizzle } from "drizzle-orm/better-sqlite3";
// import _Database from "better-sqlite3";
// // import { migrate } from "drizzle-orm/better-sqlite3/migrator";
// import { type AppDatabase } from "./index";

// export async function startupLocalDB2(): Promise<AppDatabase> {
//   console.log("Initializing local DB");
//   // This hack is here, because if we import the db directly, it will fail the Vite build due to:
//   // vite Cannot bundle Node.js built-in "node:crypto" imported from "node_modules/drizzle-orm/better-sqlite3/migrator.mjs".
//   // Consider disabling ssr.noExternal or remove the built-in dependency.
//   const Database = (await import("better-sqlite3")).default;
//   const { migrate } = await import("drizzle-orm/better-sqlite3/migrator");
//   const { drizzle } = await import("drizzle-orm/better-sqlite3");

//   console.log("drizzle", drizzle, drizzle === _drizzle);
//   debugger;
//   // console.log("Database", Database, Database === _Database);

//   const db = drizzle(new Database(".db/sqlite.db"));

//   await migrate(db, { migrationsFolder: "./drizzle" });
//   return db as any;
// }

// const { drizzle } = require("drizzle-orm/better-sqlite3");
// const Database = require("better-sqlite3");
// const { migrate } = require("drizzle-orm/better-sqlite3/migrator");

// exports.startupLocalDB = () => {
//   console.log("Initializing local DB");
//   const db = drizzle(new Database(".db/sqlite.db"));
//   migrate(db, { migrationsFolder: "./drizzle" });
//   console.log("DB ready!");
//   return db;
// };
