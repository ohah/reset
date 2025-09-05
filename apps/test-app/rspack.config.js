const rspack = require('@rspack/core');
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
const isDev = process.env.NODE_ENV === "development";

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  entry: './src/main.tsx',
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  refresh: true,
                }
              }
            }
          }
        }
      }
    ]
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './index.html' }),
    isDev && new ReactRefreshPlugin(),    
  ].filter(Boolean)
};