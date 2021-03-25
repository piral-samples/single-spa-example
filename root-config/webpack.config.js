const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "single-spa-example";
  const publishUrl =
    process.env.URL ||
    "https://feed.piral.cloud/api/v1/pilet/single-spa-example";
  const importmapUrl = publishUrl.replace("/pilet/", "/importmap/");
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  defaultConfig.entry = "./src/index.js";

  return merge(
    defaultConfig,
    {
      plugins: [
        new HtmlWebpackPlugin({
          inject: false,
          template: "src/index.ejs",
          templateParameters: {
            isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
            importmapUrl,
            orgName,
          },
        }),
      ],
    },
    {
      // modify the webpack config however you'd like to by adding to this object
    }
  );
};
