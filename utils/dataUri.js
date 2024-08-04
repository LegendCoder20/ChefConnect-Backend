const DataUriParser = require("datauri/parser");
const path = require("path");

const getUri = (image) => {
  const parser = new DataUriParser();
  const extName = path.extname(image.originalname).toString();
  // console.log("I'm from dataUri.js  --> getUri --> extName", extName);
  return parser.format(extName, image.buffer);
};

module.exports = getUri;
