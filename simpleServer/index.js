const fs = require("fs");
const http = require("http");
const url = require("url");

// creating server
const server = http.createServer((req, res) => {
  const pathName = req.url;
  // simple routing
  if (pathName === "/overview") {
    res.end(" this is overview page");
  } else if (pathName === "/") {
    res.end("Hello from the homepage");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>page not found</h1>");
  }
});

// listening for the incoming request.
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});
