import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const frontendDir = process.cwd();
const repositoryRoot = path.resolve(frontendDir, "..");
const backendDir = path.join(repositoryRoot, "backend");
const sqljsLocation = path.join(backendDir, ".e2e", "playwright-db.sqlite");

export const e2eBackendEnvironment = {
  ...process.env,
  DB_DRIVER: "sqljs",
  SQLJS_LOCATION: sqljsLocation,
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
