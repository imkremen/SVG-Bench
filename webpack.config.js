const path = require('path');

const mode = 'development';
// const mode = 'production';

module.exports = {
    entry: {
        symbol: "./src/symbol.js",
        css: "./src/css.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    mode: mode,
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
      }
};