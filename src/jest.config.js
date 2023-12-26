module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
  extensionsToTreatAsEsm: [".js", ".jsx"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
