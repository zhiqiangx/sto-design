const path = require('path');
const { paths } = require('react-app-rewired');
const overrides = require('react-app-rewired/config-overrides');
const config = require(paths.scriptVersion + '/config/webpack.config');

module.exports = {
  ignore: ['src/components/index.tsx'],
  require: [
    path.join(__dirname, 'node_modules/@alifd/next/dist/next.css'),
    path.join(__dirname, 'node_modules/@alifd/theme-sto/dist/next.css')
  ],
  showUsage: true,
  styleguideDir: 'build',
  webpackConfig: overrides.webpack(config(process.env.NODE_ENV), process.env.NODE_ENV),
};
