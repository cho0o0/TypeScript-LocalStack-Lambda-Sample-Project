const path = require('path');
const glob = require('glob');
const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const srcDir = './src';
const entries = {};
let serverlessConfigPath;

(function copyServerlessConfigTemplate() {
  const serverlessConfigTemplate = path.resolve(__dirname, 'template', 'serverless.template.yml');
  serverlessConfigPath = path.resolve(__dirname, 'dist', 'serverless.yml');
  fs.copyFileSync(serverlessConfigTemplate, serverlessConfigPath);
})();

glob
  .sync(`${srcDir}/*/index.@(js|ts)`)
  .map(key => {
    return RegExp(`${srcDir}/(.*)/index\.[j|t]s`).exec(key);
  })
  .map(result => ({ lambdaName: result[1], lambdaLocation: result[0] }))
  .filter(({ lambdaName }) => !lambdaName.startsWith('localtest-'))
  .forEach(({ lambdaName, lambdaLocation }) => {
    entries[lambdaName] = lambdaLocation;
    const configFile = path.resolve(lambdaLocation, '../serverless.yml');
    const definition = `
  ${lambdaName}:
    package:
      include:
        - ./${lambdaName}/**/*
      exclude:
        - ./**/*
    handler: ${lambdaName}/${lambdaName}.handler
    ${fs.existsSync(configFile) ? `events: \${file(${configFile}):events}` : ''}
    `;
    fs.appendFileSync(serverlessConfigPath, definition);
  });

console.log(entries);

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].js',
    libraryTarget: 'commonjs',
  },
  externals: [
    {
      'aws-sdk': 'aws-sdk',
    },
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          comments: false,
          output: {
            beautify: false,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  mode: 'production',
};
