const path = require('path');


module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.resolve(__dirname,'./src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" },
      { test: /\.js$/, loader: "source-map-loader" },

    ]
  },
  devServer: {
    port: 9002,
    historyApiFallback: true,
    publicPath: '/build',
    proxy: {
      '/': {
        target: 'http://localhost:3002',
        secure: false,
      }
    }
  }
}