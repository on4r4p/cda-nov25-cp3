import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const frontendDir = process.cwd();
const repositoryRoot = path.resolve(frontendDir, "..");
const backendDir = path.join(repositoryRoot, "backend");
const sqljsLocation = path.join(backendDir, ".e2e", "playwright-db.sqlite");
const e2eFrontendOrigin = "http://127.0.0.1:3000";
const e2eBackendOrigin = "http://127.0.0.1:4000";

export const e2eFrontendEnvironment = {
  ...process.env,
  NEXT_PUBLIC_GRAPHQL_API_URL: e2eBackendOrigin,
};

export const e2eBackendEnvironment = {
  ...process.env,
  DB_DRIVER: "sqljs",
  SQLJS_LOCATION: sqljsLocation,
  CORS_ALLOWED_ORIGINS: [process.env.CORS_ALLOWED_ORIGINS, e2eFrontendOrigin, e2eBackendOrigin]
    .filter(Boolean)
    .join(","),
};

export function prepareE2EDatabase() {
  fs.mkdirSync(path.dirname(sqljsLocation), { recursive: true });
}

export function resetDatabase() {
  prepareE2EDatabase();

  execFileSync("npm", ["run", "resetDB"], {
    cwd: backendDir,
    env: e2eBackendEnvironment,
    stdio: "inherit",
  });
}
