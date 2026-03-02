import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
  collectCoverageFrom: [
    "src/utils/**/*.{ts,tsx}",
    "src/pages/**/*.{ts,tsx}",
    "!src/pages/_app.tsx",
    "!src/pages/_document.tsx",
    "!src/graphql/**/*",
  ],
};

export default createJestConfig(config);
