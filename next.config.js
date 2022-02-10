const path = require("path");
const dotenv = require("dotenv");

const node_env = process.env.NODE_ENV;
const deployment = process.env.DEPLOYMENT ? process.env.DEPLOYMENT : "default";
require("dotenv").config({ path: `./.env/.env.${node_env}.${deployment}` });
const webpack = require("webpack");
module.exports = {
  future: {
    webpack5: true,
  },
  parserOptions: {
    ecmaVersion: 5,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  exportPathMap: async function () {
    return {
      // "/": { page: "/invoice" },
    };
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  publicRuntimeConfig: {
    localeSubpaths:
      typeof process.env.LOCALE_SUBPATHS === "string"
        ? process.env.LOCALE_SUBPATHS
        : "none",
    FEATURES: process.env.FEATURES,
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push(
      {
        test: /\.(less)/,
        use: [
          {
            loader: "emit-file-loader",
            options: {
              name: "dist/[path][name].[ext].js",
            },
          },
          {
            loader: "babel-loader",
            options: { compact: false },
          },
          {
            loader: "raw-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: dev,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: { sourceMap: dev, javascriptEnabled: true },
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "emit-file-loader",
            options: {
              name: "dist/[path][name].[ext].js",
            },
          },
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, "./.babelrc"),
            },
          },
          {
            loader: "styled-jsx-css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: dev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: dev,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif|pdf|ico|ttf|woff)$/,
        use: [
          {
            loader: "emit-file-loader",
            options: {
              name: "dist/[path][name]-[hash:8].[ext]",
            },
          },
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              publicPath: "/_next/static/images/",
              outputPath: "static/images/",
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /worker\.js$/,
        use: [
          {
            loader: "worker-loader",
            options: {
              name: "js/worker.[hash].js",
            },
          },
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, "./.babelrc"),
            },
          },
        ],
      }
    );
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    config.plugins.push(
      new webpack.DefinePlugin({
        __CLIENT__: true,
        // Other global variables
      })
    );
    config.output.hotUpdateMainFilename =
      "static/webpack/[fullhash].[runtime].hot-update.json";
    return config;
  },
};
