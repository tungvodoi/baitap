const http = require("http");
const formidable = require("formidable");
const fs = require("fs");
const mv = require("mv");
http
  .createServer((req, res) => {
    if (req.method == "GET" || req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<form action="/fileupload" method="post" enctype="multipart/form-data">
      <input type="file" name="fileupload"/><br>
      <input type="submit"  />
      </form>
      `);
    }
    if (req.method == "POST" && req.url === "/fileupload") {
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields, files) => {
        res.writeHead(200, { "content-type": "application/json" });
        var oldpath = files.fileupload.path;
        var newpath = "./" + files.fileupload.name;
        mv(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write("File uploaded and moved!");
          res.end();
        });
      });
    }
  })
  .listen(8000, () => {
    console.log("server running");
  });
// const http = require('http');
// const formidable = require('formidable');

// const server = http.createServer((req, res) => {
//   if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
//     // parse a file upload
//     const form = formidable({ multiples: true });

//     form.parse(req, (err, fields, files) => {
//       res.writeHead(200, { 'content-type': 'application/json' });
//       res.end(JSON.stringify({ fields, files }, null, 2));
//     });

//     return;
//   }

//   // show a file upload form
//   res.writeHead(200, { 'content-type': 'text/html' });
//   res.end(`
//     <h2>With Node.js <code>"http"</code> module</h2>
//     <form action="/api/upload" enctype="multipart/form-data" method="post">
//       <div>Text field title: <input type="text" name="title" /></div>
//       <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

// server.listen(8000, () => {
//   console.log('Server listening on http://localhost:8080/ ...');
// });
