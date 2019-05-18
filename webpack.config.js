const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  PrettierPlugin = require("prettier-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  webpack = require("webpack"),
  CnameWebpackPlugin = require("cname-webpack-plugin");

const sass = {
  test: /\.(sass|scss)$/,
  include: path.resolve("src"),
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {}
    },

    {
      loader: "css-loader",
      options: {
        sourceMap: true,
        url: false,
        modules: true,
        localIdentName: "[local]__[hash:base64:5]"
      }
    },

    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        sourceMap: true,
        plugins: [
          require("cssnano")({
            preset: ["default", { discardComments: { removeAll: true } }]
          }),

          require("autoprefixer")({
            cascade: false,
            browsers: ["last 4 version", "IE >= 8"]
          })
        ]
      }
    },

    {
      loader: "sass-loader",
      options: { sourceMap: true }
    }
  ]
};

const js = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: "babel-loader"
};

const img = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    "file-loader",
    {
      loader: "image-webpack-loader",
      options: {
        disable: true
      }
    }
  ]
};

const config = {
  entry: ["babel-polyfill", "./src/client/index.js"],
  output: {
    path: path.resolve("docs"), // for github pages deploy
    filename: "[name].bundle.js"
  },

  devServer: {
    disableHostCheck: true, // fix wds disconnect error
    overlay: true
  },

  module: { rules: [js, sass, img] },
  plugins: [
    new PrettierPlugin({
      printWidth: 90, // Specify the length of line that the printer will wrap on.
      tabWidth: 2, // Specify the number of spaces per indentation-level.
      useTabs: true, // Indent lines with tabs instead of spaces.
      semi: true, // Print semicolons at the ends of statements.
      encoding: "utf-8", // Which encoding scheme to use on files
      extensions: [".js"], // Which file extensions to process
      trailingComma: "all",
      arrowParens: "always"
    }),

    new HtmlWebpackPlugin({
      template: "./src/client/index.html"
    }),

    new MiniCssExtractPlugin({
      filename: "style.bundle.css"
    }),

    new CnameWebpackPlugin({
      domain: "madembed.ru"
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};

module.exports = (env, options) => {
  const isProd = options.mode === "production";

  config.devtool = isProd ? false : "cheap-module-eval-source-map";

  config.plugins.push(
    new webpack.DefinePlugin({ PROD_MODE: JSON.stringify(isProd) })
  );

  return config;
};
