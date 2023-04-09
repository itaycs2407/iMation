module.exports = {
  transform: {
    "\\.[ts]sx?$": "babel-jest",
    presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  },
};
