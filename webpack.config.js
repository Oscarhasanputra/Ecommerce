var path = require("path");
var webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
var BrotliPlugin = require('brotli-webpack-plugin');
var browserConfig = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "public", "assets", "js"),
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/assets/js/",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  mode: "production",

  devtool: false,
  plugins: [
    // new webpack.DefinePlugin({
    //   process:{
    //     env:{
    //     __isBrowser__: true,
    //     }
    //   }
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production')
      }
  }),
    // new webpack.optimize.DedupePlugin(), //dedupe similar code
    // new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    // new webpack.optimize.LimitChunkCountPlugin({
    //   maxChunks: 1
    // }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new BrotliPlugin()
  ],
  optimization: {
    concatenateModules: true,
    mergeDuplicateChunks: true,
    minimizer: [new TerserPlugin()],
    // splitChunks: {
    //   name: 'vendors',
    //   chunks: 'all',
    // }
  },
};

module.exports = [browserConfig];
