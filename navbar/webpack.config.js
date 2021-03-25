const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "single-spa-example",
    projectName: "navbar",
    webpackConfigEnv,
  });
  
  defaultConfig.entry = './src/index.js';

  return merge(defaultConfig, {
    // customizations can go here
  });
};
