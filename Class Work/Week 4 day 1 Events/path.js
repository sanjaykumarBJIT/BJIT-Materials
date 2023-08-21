const path = require("path");
const os = require("os");

console.log(os.arch());
console.log(path.dirname("/"));
console.log(__dirname);
console.log(path.join(__dirname, "..", "..","path.js"));