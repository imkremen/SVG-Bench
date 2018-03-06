const path = require('path');

const mode = 'development';
// const mode = 'production';

module.exports = {
    entry: ["./src/index.js"],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: mode,
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
      }
};