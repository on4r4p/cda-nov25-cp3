import fs from "node:fs";
import path from "node:path";
import { DataSource } from "typeorm";
import { Article } from "../entities/Article";
import { Category } from "../entities/Category";
import env from "../env";

const dbDriver = process.env.DB_DRIVER;
const sqljsLocation =
  process.env.SQLJS_LOCATION ??
  path.join(process.cwd(), ".e2e", "playwright-db.sqlite");

if (dbDriver === "sqljs") {
  fs.mkdirSync(path.dirname(sqljsLocation), { recursive: true });
}

const db = new DataSource(
  dbDriver === "sqljs"
    ? {
        type: "sqljs",
        location: sqljsLocation,
        autoSave: true,
        entities: [Article, Category],
        synchronize: true,
      }
    : {
        type: "postgres",
        host: env.DB_HOST,
        username: env.DB_USER,
        password: env.DB_PASS,
        port: env.DB_PORT,
        database: env.DB_NAME,
        entities: [Article, Category],
        synchronize: true,
      },
);

export async function clearDB() {
  await db.synchronize(true);
}

export default db;
