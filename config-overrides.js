const { override, fixBabelImports, disableEsLint } = require('customize-cra');

module.exports = {
  webpack: override(
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: '@alifd/next',
        libraryDirectory: 'es',
        style: 'true',
    })
  )
};
