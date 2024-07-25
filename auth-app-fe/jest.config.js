module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    testEnvironment: 'jsdom', // Use jsdom if you're testing React components  
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  };