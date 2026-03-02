const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import("jest").Config} */
const config = {
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

module.exports = createJestConfig(config);
