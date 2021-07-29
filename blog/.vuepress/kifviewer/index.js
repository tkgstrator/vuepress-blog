const { path } = require("tkgstrator/markdown-kifviewer");

module.exports = (options = {}, context) => ({
  enhanceAppFiles: path.resolve(__dirname, "enhanceAppFile.js"),
});
