module.exports = {
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'helpers',
    'connectors',
  ],
  testRegex: '\\.test\\.js$',
  roots: [
    'src',
  ],
};
