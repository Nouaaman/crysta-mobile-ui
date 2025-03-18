const {
    wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const blacklist = require("metro-config/src/defaults/exclusionList");

const config = getDefaultConfig(__dirname);

//add .bin for models
config.resolver.sourceExts = [...config.resolver.sourceExts, "bin"];

// Modify the resolver to blacklist nodejs-assets, android, and ios folders
config.resolver.blacklistRE = blacklist([
    /\/android\/.*/, // Exclude android folder
    /\/ios\/.*/, // Exclude ios folder
]);

const configWithNativeWind = withNativeWind(config, { input: "./global.css" });

module.exports = wrapWithReanimatedMetroConfig(configWithNativeWind);
