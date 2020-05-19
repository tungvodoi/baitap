const fs = require("fs");
const path = require("path");

function dirTree(filename) {
  let stats = fs.lstatSync(filename);
  let info = {
    path: filename,
    name: path.basename(filename),
  };
  if (stats.isDirectory()) {
    info.type = "folder";
    info.children = fs.readdirSync(filename).map((child) => {
      return dirTree(`${filename}/${child}`);
    });
  } else {
    info.type = "file";
  }
  return info;
}
console.log(dirTree("./test"));
