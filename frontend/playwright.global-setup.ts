import { resetDatabase } from "./e2e/support/database";

async function globalSetup() {
  resetDatabase();
}

export default globalSetup;
