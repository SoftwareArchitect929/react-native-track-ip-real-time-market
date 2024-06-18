module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-class-properties", {"loose": true}],
    ["@babel/plugin-proposal-private-methods", {"loose": true}],
    "react-native-reanimated/plugin",
    "@babel/plugin-syntax-dynamic-import",
  ],
};
