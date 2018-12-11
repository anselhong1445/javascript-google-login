const http = require("http");
const url = require("url");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    console.log("favicon requested");
    return;
  }

  const path = req.url === "/" ? __dirname + "/index.html" : __dirname + req.url;
  fs.readFile(path, (err, data) => {
    if (err) {
      // throw err;
      console.log(err);
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
