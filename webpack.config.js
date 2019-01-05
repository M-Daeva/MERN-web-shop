const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const sass = {

  test: /\.(sass|scss)$/,
  include: path.resolve("src"),
  use: [{
    loader: MiniCssExtractPlugin.loader,
    options: {}
  },
  {
    loader: "css-loader",
    options: {
      sourceMap: true,
      url: false
    }
  },
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      sourceMap: true,
      plugins: () => [
        require("cssnano")({
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
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

const pug = {
  test: /\.pug$/,
  use: ["html-loader?attrs=false", "pug-html-loader"]
};

const js = {
  test: /\.js$/,
  loader: "babel-loader"
};


const config = {
  entry: ["./src/js/frontend/main.js", "./src/sass/style.sass"],
  output: {
    path: path.resolve("docs"), // for github pages deploy
    filename: "[name].bundle.js"
  },

  devServer: {
    disableHostCheck: true,   // god bless this solution
    overlay: true,
    proxy: {
      "/js-hw-api/**": {
        target: "http://faceprog.ru/",
        secure: false,
        changeOrigin: true
      }
    }
  },

  module: { rules: [pug, sass, js] },
  plugins: [
    new PrettierPlugin({
      printWidth: 90, // Specify the length of line that the printer will wrap on.
      tabWidth: 2, // Specify the number of spaces per indentation-level.
      useTabs: true, // Indent lines with tabs instead of spaces.
      semi: true, // Print semicolons at the ends of statements.
      encoding: "utf-8", // Which encoding scheme to use on files
      extensions: [".js", ".ts"], // Which file extensions to process
      trailingComma: "all",
      arrowParens: "always"
    }),

    new MiniCssExtractPlugin({
      filename: "style.bundle.css"
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/pug/index.pug",
      inject: false
    }),

    new CopyWebpackPlugin([
      {
        from: './src/img',
        to: './img'
      },
      /*
      {
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/favicon',
        to: './favicon'
      },
      
      {
        from: './src/uploads',
        to: './uploads'
      }
      */
    ]),

  ]
};


module.exports = (env, options) => {
  config.devtool = options.mode === "production" ?
    false :
    "cheap-module-eval-source-map";
  return config;
}