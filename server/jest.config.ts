import type { Config } from "jest";

const config: Config = {
  testMatch: ["**/__tests__/*.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
};

export default config;
