const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: ["core-js/stable", "./src/index.ts"],

  output: {
    path: path.join(__dirname, outputDirectory),
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: "[name].bundle.js",
    publicPath: "/",

    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: "[name].bundle.js",
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(mp4|jpe?g|png|woff|woff2|eot|ttf|svg|otf)$/,
        loader: "file-loader?limit=100000",
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    inline: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
    publicPath: "/",
    port: 3001,
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:3001",

        secure: false,
      },
    },
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(["src/server/dist"]),
  ],
};
