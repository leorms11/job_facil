const { pathsToModuleNameMapper } = require("ts-jest"); // eslint-disable-line
const { compilerOptions } = require("./tsconfig.json"); // eslint-disable-line

export default {
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: ["**/*.spec.ts"],
  // preset: "ts-jest",
  bail: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
  transform: {
    "^.+\\.(t|j)s$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
            decorators: true,
          },
          target: "es2017",
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: "es6",
          noInterop: false,
        },
      },
    ],
  },
};
