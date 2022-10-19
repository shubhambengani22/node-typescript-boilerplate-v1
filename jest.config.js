/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist/"],
  moduleNameMapper: {
    "@controller": "<rootDir>/src/controller/index",
    "@helpers": "<rootDir>/src/helpers/index",
    "@middleware": "<rootDir>/src/middleware/index",
    "@models": "<rootDir>/src/models/index",
    "@routes": "<rootDir>/src/routes/index",
    "@server": "<rootDir>/src/server/index",
    "@services": "<rootDir>/src/services/index",
    "@store": "<rootDir>/src/store/index",
    "@types": "<rootDir>/src/types/index",
  },
};
