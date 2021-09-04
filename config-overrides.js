const { override, fixBabelImports } = require('customize-cra');

module.exports = {
  webpack: override(
    fixBabelImports('import', {
        libraryName: '@alifd/next',
        libraryDirectory: 'es',
        style: 'true',
    })
  )
};
