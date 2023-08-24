const http = require("http");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url === "/products/edit" && req.method === "POST") {
    let body = "";
    req.on("data", (buffer) => {
      body += buffer;
    });
    req.on("end", () => {
      //initial attribute check
      const requiredAttributes = ["name", "price", "stock", "author"];
      const missingAttributes = requiredAttributes.filter(
        (attr) => !(attr in JSON.parse(body))
      );
      if (missingAttributes.length === 0) {
        console.log("All required attributes are present.");

        fs.readFile(path.join(__dirname, "data", "manga.json"), (err, data) => {
          if (!err) {
            let jsonData = JSON.parse(data);
            res.writeHead(200, { "Content-type": "application/json" });
            let a = JSON.parse(body);
            const newData = {
              ...a,
              id: jsonData[jsonData.length - 1].id + 1,
            };
            jsonData.push(newData);

            //log file
            const updatetime =
              "Created at: Date: " +
              new Date().getDate() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getDay() +
              " Time: " +
              new Date().getTime();
            fs.appendFile(
              "./data/logFile.txt",
              updatetime + "\n",
              "utf8",
              (err) => {
                if (err) {
                  console.error("Error writing Update file:", err);
                } else {
                  console.log("Update File written successfully.");
                }
              }
            );

            //console.log(jsonData);
            fs.writeFile(
              "./data/manga.json",
              JSON.stringify(jsonData),
              "utf8",
              (err) => {
                if (err) {
                  console.error("Error writing file:", err);
                } else {
                  console.log("File written successfully.");
                }
              }
            );
            res.write(JSON.stringify({ jsonData })); //response message
            return res.end();
          } else {
            res.writeHead(500, { "Content-type": "application/json" });
            res.write(JSON.stringify({ message: "internal server error" }));
            return res.end();
          }
        });
      } else {
        console.log("Missing attributes:", missingAttributes);
        res.writeHead(500, { "Content-type": "application/json" });
        res.write(JSON.stringify({ message: "Data input error" }));
        return res.end();
      }
      //
    });
  } else {
    res.writeHead(500, { "Content-type": "application/json" });
    res.write(JSON.stringify({ message: "URL or method error" }));
    return res.end();
  }
});

server.listen(8000, () => {
  console.log("Server is running on 8000..");
});
