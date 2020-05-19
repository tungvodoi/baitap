const url = require("url");

let myUrl = `https://sinhnx.dev/lap-trinh/windows-terminal`;

let newUrl = url.parse(myUrl);
console.log(newUrl);
