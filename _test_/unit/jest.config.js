module.exports = {
    testTimeout: 40000, // Set global timeout to 40 seconds
    maxWorkers: "70%",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      },
      transformIgnorePatterns: [
        "node_modules/(?!your-module-to-transform)"
      ],
      extensionsToTreatAsEsm: [".js"],
      moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
      testEnvironment: "node",
};
