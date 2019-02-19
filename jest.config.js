module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: '<rootDir>tests/setupEnzyme.js',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/tests/fileMock.js'
  }
};
