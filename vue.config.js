/* eslint-disable prettier/prettier */
var webpack = require("webpack");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css", "html"];
const port = process.env.port || process.env.npm_config_port || 1994; // dev port
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  // transpileDependencies: process.env.NODE_ENV === "development" ? ["*"] : [],
  transpileDependencies: ["*"],
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    // proxy: {
    //     '/base': {
    //         target: 'http://106.14.248.47:9008/api',
    //         changeOrigin: true,
    //         ws: true,
    //         pathRewrite: {
    //             '^/base': '/'
    //         }
    //     }
  },
  css: {
    loaderOptions: {
      stylus: {
        import: "~@/styles/color.styl",
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true,
      });
  },
  configureWebpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        Cookies: "js-cookie",
        moment: "moment",
      })
    );

    if (process.env.NODE_ENV === "production") {
      // 生产环境
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]", // 提示compression-webpack-plugin@3.0.0的话asset改为filename
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    } else {
      // 开发环境
    }
  },
};
