/**
 * @file src/jest.config.js
 *
 * This file configures Jest for unit testing in the Fitness Goal Tracker MVP. 
 * It specifies the test environment, file patterns, and custom settings for Jest to effectively run tests for the project.
 *
 * This file integrates with:
 * - `package.json`: Reads the "jest" configuration from the package.json file. 
 * - `src/**/*.{js,ts,jsx,tsx}`: Runs tests against all JavaScript and TypeScript files within the project.
 * - `src/tests/**/*.{js,ts,jsx,tsx}`:  Specifically targets test files within the `tests` directory. 
 *
 * This file implements the following features:
 * - Test Environment: Defines the environment used for running tests (e.g., `jsdom` for web-based tests).
 * - Test Runner:  Specifies the test runner to use (e.g., `jest-circus`).
 * - Coverage:  Configures code coverage reporting.
 * - Snapshot Testing: Enables snapshot testing for UI components.
 * - Transform: Defines how to transform files before running tests (e.g., TypeScript transpilation).
 *
 * This file adheres to the following design principles:
 * - Configuration Object: Uses a configuration object to define Jest settings.
 *
 * This file supports the following user stories:
 * - As a developer, I want to automate unit testing for my code to ensure its correctness.
 * - As a developer, I want to have a comprehensive report on code coverage to identify untested areas.
 * - As a developer, I want to use snapshot testing to ensure UI components render correctly.
 * - As a developer, I want to configure Jest to support TypeScript files efficiently.
 */
module.exports = {
  // The root directory that Jest should be run in
  rootDir: ".",
  // Indicates whether the coverage information should be collected and reported
  collectCoverage: true,
  // An array of regexp pattern strings that are matched against all module paths
  // before considered 'visible' to the module loader.
  //  - This can be used to only include specific modules in coverage reporting. 
  collectCoverageFrom: [
    "src/**/*.{js,ts,jsx,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // A map from regular expressions to module paths that allow you to stub out
  // modules with mocks when you run tests.
  // - Useful for isolating components and testing specific interactions.
  moduleNameMapper: {
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  // The test environment that will be used for testing
  // - Use 'jsdom' for web-based tests.
  testEnvironment: "jsdom",
  // An array of regexp pattern strings that are matched against all source file
  // paths before re-running tests in watch mode.
  // - This can be used to only re-run specific tests in watch mode.
  watchPathIgnorePatterns: ["/node_modules/", "/coverage/"],
  // The default configuration for the `transform` option that Jest uses to
  // transform your files for testing
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  //  - This configures Jest to use the 'ts-jest' transformer for TypeScript files. 
  transformIgnorePatterns: [
    "node_modules/(?!(@testing-library/.*))",
  ],
  //  - This configures Jest to ignore specific modules during transformation,
  // - This can be useful to exclude modules that are not directly related to the tests. 
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  //  - This specifies a file to be executed after the environment has been set up,
  // - This is typically used to set up global variables or mocks before running tests.
  preset: "ts-jest",
  //  - This specifies the Jest preset to use,
  // - This determines how Jest configures itself based on the project's structure and dependencies. 
};