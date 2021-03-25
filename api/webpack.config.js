const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "single-spa-example",
    projectName: "api",
    webpackConfigEnv,
  });

  defaultConfig.entry = './src/index.js';

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: [/^rxjs\/?.*$/],
  });
};
