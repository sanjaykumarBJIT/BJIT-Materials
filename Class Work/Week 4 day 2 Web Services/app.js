const http = require("http");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");

const server = http.createServer((req,res) => {
    res.writeHead(200, {"Content-type": "text/HTML"});
    res.write(JSON.stringify({message: "hello world..............."}));
    res.end();
});

server.listen(8000, () => {
    console.log("Server is running on 8000..")
});