const path = require("path");
const dotenv = require("dotenv");

const node_env = process.env.NODE_ENV;
const node_project = process.env.NODE_PROJECT
  ? process.env.NODE_PROJECT
  : "default";
require("dotenv").config({ path: `./.env/.env.${node_env}.${node_project}` });
const webpack = require("webpack");
module.exports = {
  parserOptions: {
    ecmaVersion: 5,
  },
  compress: true,
  publicRuntimeConfig: {
    localeSubpaths:
      typeof process.env.LOCALE_SUBPATHS === "string"
        ? process.env.LOCALE_SUBPATHS
        : "none",
    FEATURES: process.env.FEATURES,
  },
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(less)/,
        loader: [
          {
            loader: "emit-file-loader",
            options: {
              name: "dist/[path][name].[ext].js",
            },
          },
          {
            loader: "babel-loader",
            query: { compact: false },
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
        test: /\.(jpe?g|png|svg|gif|pdf|ico)$/,
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
      }
    );
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    config.plugins.push(
      new webpack.DefinePlugin({
        __CLIENT__: true,
        // Other global variables
      })
    );
    return config;
  },
};
