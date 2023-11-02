module.exports = {
    transform: {
      '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],

    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };