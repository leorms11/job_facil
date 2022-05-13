const { pathsToModuleNameMapper } = require("ts-jest"); // eslint-disable-line
const { compilerOptions } = require("./tsconfig.json"); // eslint-disable-line

export default {
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: ["**/*.spec.ts"],
  bail: true,
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
};
