const { pathsToModuleNameMapper } = require("ts-jest"); // eslint-disable-line
const { compilerOptions } = require("./tsconfig.json"); // eslint-disable-line

export default {
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: ["**/*.spec.ts"],
  preset: "ts-jest",
  bail: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
};
