const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build")
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "../build"),
    index: "index.html",
    port: 9000
  },
  resolve: {
    extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new CleanWebpackPlugin()
  ]
};
