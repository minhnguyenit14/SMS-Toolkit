module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "tests": ["./tests/"],
          "@config": "./src/config",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@containers": "./src/containers",
          "@constants": "./src/constants",
          "@helper": "./src/helper",
          "@HOC": "./src/HOC",
          "@navigation": "./src/navigation",
          "@network": "./src/network",
        }
      }
    ]
  ],
  "env": {
    "production": {
      "plugins": [["transform-remove-console", { "exclude": ["error", "warn", "info"] }]]
    }
  }
};
