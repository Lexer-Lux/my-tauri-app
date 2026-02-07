import Surreal from "surrealdb";

const DB_URL = import.meta.env.VITE_SURREALDB_URL ?? "http://localhost:8000";
const DB_NAMESPACE = import.meta.env.VITE_SURREALDB_NS ?? "app";
const DB_DATABASE = import.meta.env.VITE_SURREALDB_DB ?? "app";

let db: Surreal | null = null;

export async function getDb(): Promise<Surreal> {
  if (db) return db;

  db = new Surreal();
  await db.connect(DB_URL);
  await db.use({ namespace: DB_NAMESPACE, database: DB_DATABASE });
  return db;
}

export async function closeDb(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
