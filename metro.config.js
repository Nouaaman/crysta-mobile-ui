const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const blacklist = require('metro-config/src/defaults/blacklist');

const config = getDefaultConfig(__dirname);

// Modify the resolver to blacklist nodejs-assets, android, and ios folders
config.resolver.blacklistRE = blacklist([
    /\/nodejs-assets\/.*/, // Exclude nodejs-assets folder
    /\/android\/.*/,       // Exclude android folder
    /\/ios\/.*/,           // Exclude ios folder
]);

module.exports = wrapWithReanimatedMetroConfig(
    withNativeWind(config, { input: "./global.css" })
);

// const {
//     wrapWithReanimatedMetroConfig,
// } = require('react-native-reanimated/metro-config');

// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");

// const config = getDefaultConfig(__dirname);

// module.exports = wrapWithReanimatedMetroConfig(withNativeWind(config, { input: "./global.css" }));
