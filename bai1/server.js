const http = require("http");
const fs = require("fs");
const path = require("path");

const qs = require("querystring");
http
  .createServer((req, res) => {
    if (req.method == "GET") {
      let filePath = req.url;

      if (filePath == "/") {
        filePath = "./index.html";
      } else {
        filePath = "." + req.url;
      }

      let extname = path.extname(filePath);
      let contentType = "text/html";
      switch (extname) {
        case ".js":
          contentType = "text/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
        case ".wav":
          contentType = "audio/wav";
          break;
      }
      res.writeHead(200, { "Content-type": contentType });
      let html = fs.readFileSync(filePath);

      res.write(html);
      res.end();
    }
    if (req.method == "POST") {
      const chunks = [];
      req.on("data", function (chunk) {
        chunks.push(chunk);
      });
      req.on("end", () => {
        let data = qs.parse(chunks.toString());
        let fileName = "./students.json";
        if (!fs.existsSync(fileName)) {
          fs.writeFile(fileName, JSON.stringify([data]), (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
        } else {
          fs.readFile(fileName, (err, content) => {
            let newData = JSON.parse(content.toString());
            console.log(newData);
            console.log(data);
            newData.push(data);
            fs.writeFile(fileName, JSON.stringify(newData), (err) => {
              if (err) throw err;
              console.log("The lyrics were updated!");
            });
          });
        }
        res.writeHead(200, {
          "content-type": "text/plain; charset=UTF-8",
        });
        res.write(JSON.stringify(data));
        res.end();
      });
    }
  })
  .listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
  });
