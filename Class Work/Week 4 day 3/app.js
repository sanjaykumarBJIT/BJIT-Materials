const http = require("http");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");

const server = http.createServer((req, res) => {

    let body = "";
    req.on("data", (buffer) => {
        body+= buffer;
    });
    req.on("end", () => {
        console.log("data received: ", JSON.parse(body).state);
        res.writeHead(200, { "Content-type": "application/json" });
        let a = JSON.parse(body).state;
        res.write(JSON.stringify({ message: "data received: ", a}));
        return res.end();
    });

    
//   if (req.url === "/products/all" && req.method === "GET") {
//     try {
//     //   const jsondata = JSON.parse(
//     //     fs.readFileSync("./data/manga.json", "utf-8")
//     //   );
//     //   console.log(jsondata);
//     //   res.writeHead(200, { "Content-type": "application/json" });
//     //   // res.write(JSON.stringify({message: "hello world..............."}));
//     //   res.write(JSON.stringify({ message: "data :", data: jsondata }));

//       fs.readFile(
//         path.join(__dirname, "data", "mangaa.json"),
//         (err,data) => {
//             if(!err){
//                 const jsonData = JSON.parse(data);
//                 res.writeHead(200, { "Content-type": "application/json" });
//                 res.write(JSON.stringify({message: "data received", jsonData}));
//                 return res.end();
//             }
//             else{
//                 res.writeHead(500, { "Content-type": "application/json" });
//                 res.write(JSON.stringify({ message: "internal server error" }));
//                 return res.end();
//             }
//         }
//       );
//     //   return res.end();
//     } catch (error) {
//       res.writeHead(500, { "Content-type": "application/json" });
//       res.write(JSON.stringify({ message: "internal server error" }));
//       return res.end(); //res.end should be declared only one
//     }
//   }
});

server.listen(8000, () => {
  console.log("Server is running on 8000..");
});
