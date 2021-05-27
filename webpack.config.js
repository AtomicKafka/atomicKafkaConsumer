const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      // addition - add source-map support
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" },
      { test: /\.js$/, loader: "source-map-loader" },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: ['style-loader','css-loader','sass-loader'],
      // }
      // { test: /\.css$/, loader: 'typings-for-css-modules-loader?modules' },
      // {
      //   test: /\.css$/,
      //   loader: "css-loader",
      // },
    ]
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "./style.css",
  //   }),
  // ],
  devServer: {
    historyApiFallback: true,
    publicPath: '/build', //the default port is 8080, the default webpack dev server, load static files
    proxy: {
      '/': {
        target: 'http://localhost:3001',
        secure: false,
      }

      //connects to the proxy server, in server.js. how we connect to node. points to the /api/leaders route in server.js
      //this is how to route to the server. fetch /api
      //changed it to 4000 to see how it would work. make sure to change the server.js app.listen(3000) arg to (4000) or what's specced above
    }
  }
}