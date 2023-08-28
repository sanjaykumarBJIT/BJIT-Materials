const http = require("http");
const path = require("path");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");
const Product = require("./model/product");
const { success, failure } = require("./util/common");

const server = http.createServer((req, res) => {
  const getQueryParams = () => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const queryParams = {};
    for (const param of params) {
      queryParams[param[0]] = param[1];
    }
    return queryParams;
  };
  let body = "";
  req.on("data", (buffer) => {
    body += buffer;
  });

  req.on("end", async () => {
    const requestURL = req.url.split("?")[0];

    //------------------------------get all------------------------------------------
    if (requestURL === "/products/getAll" && req.method === "GET") {
      try {
        const result = await Product.getAll();
        if (result.success) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ result }));
          res.end();
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          console.log("Here error");
          res.end(JSON.stringify(failure("Can not get the data")));
          // return res.end();
        }
      } catch (error) {
        // console.log("Here catch");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("Internal server error ")));
        // return res.end();
      }
    }
    //------------------------------get by id------------------------------------------
    else if (requestURL === "/products/getById" && req.method === "GET") {
      try {
        const result = await Product.getOneById(getQueryParams().id);
        console.log(result);

        res.writeHead(200, { "Content-Type": "application/json" });
        if (result.success) {
          console.log(result);
          if (result.data === undefined) {
            res.writeHead(400, { "Content-Type": "application/json" });
            // res.write(success("successfully get all the data", JSON.stringify(result.data)));
            res.write(failure("id does not exist"));
            return res.end();
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            // res.write(success("successfully get all the data", JSON.stringify(result.data)));
            res.write(JSON.stringify({ result }));
            return res.end();
          }
        } else {
          res.writeHead(500, { "Content-Type": "application/json" });
          // console.log("Here error");
          res.end(failure("Server error"));
          // return res.end();
        }
      } catch (error) {
        // console.log("body");
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("Can not get the data")));
        // return res.end();
      }
    }

    //------------------------------Create------------------------------------------
    else if (requestURL === "/products/create" && req.method === "POST") {
      try {
        const result = await Product.create(body);
        console.log(result);

        res.writeHead(200, { "Content-Type": "application/json" });
        if (result.success) {
          res.writeHead(200, { "Content-Type": "application/json" });
          // res.write(success("successfully get all the data", JSON.stringify(result.data)));
          res.write(JSON.stringify({ result }));
          return res.end();
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          console.log("Here error");
          res.write(failure("Can not get the data", result.error));
          return res.end();
        }
      } catch (error) {
        // console.log("Here catch");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("Internal server error ")));
        // return res.end();
      }
    }

    //------------------------------delete by ID------------------------------------------
    else if (requestURL === "/products/deleteById" && req.method === "DELETE") {
      try {
        const result = await Product.deleteById(getQueryParams().id);
        console.log(JSON.stringify(result.data));
        if (result.success === true && result.errors !== undefined) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.write(
            JSON.stringify({ message: "Id not valid, Can not delete data" })
          );
          return res.end();
        }else if(result.success === true && result.data!==undefined){
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(
            success(
              "successfully deleted the data",
              result.data
            )
          );
          return res.end();
        }
      } catch (errors) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("Internal server error ")));
      }
    }

    //------------------------------Update By ID------------------------------------------
    else if (requestURL === "/products/updateById" && req.method === "PUT") {
      try {
        const result = await Product.updateById(getQueryParams().id, body);
        console.log(result);

        res.writeHead(200, { "Content-Type": "application/json" });
        if (result.success) {
          res.writeHead(200);
          // res.write(success("successfully get all the data", JSON.stringify(result.data)));
          res.write(JSON.stringify({ result }));
          return res.end();
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          // console.log("Here error");
          res.end(failure("Can not update the data"));
          // return res.end();
        }
      } catch (error) {
        // console.log("body");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("Internal server error ")));
        // return res.end();
      }
    } 


    //---------------------------------Day 5 task---------------------------
    else if (requestURL === "/products/getTotalValue" && req.method === "GET") {
      try {
        const result = await Product.getTotal();
        if (result.success === true) {
          res.writeHead(200, { "Content-Type": "application/json" });
          // res.write(success("successfully get all the data", JSON.stringify(result.data)));
          res.write(JSON.stringify({ result }));
          return res.end();
          //console.log(result.data[0]);
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          // console.log("Here error");
          res.end(failure("Can not get data"));
          // return res.end();
        }
      } catch (error) {
        // console.log("body");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("server error")));
        // return res.end();
      }
    }

    //------------------------------get Products By userID------------------------------------
    else if (requestURL === "/products/getProductsUsingUserID" && req.method === "GET") {
      try {
        const result = await Product.getProductsByUserId(getQueryParams().id);
        // console.log(".........",result.data);
        if (result.success === true) {
          res.writeHead(200, { "Content-Type": "application/json" });
          // res.write(success("successfully get all the data", JSON.stringify(result.data)));
          res.write(JSON.stringify({ result }));
          return res.end();
          //console.log(result.data[0]);
        } else {
          res.writeHead(500, { "Content-Type": "application/json" });
          // console.log("Here error");
          res.end(failure("Id does not exist"));
          // return res.end();
        }
      } catch (error) {
        // console.log("body");
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("Can not get the data")));
        // return res.end();
      }
    }

    //------------------------------Sorting By Price------------------------------------------

    else if (requestURL === "/products/sortingByPrice" && req.method === "GET") {
      try {
        const result = await Product.sortingByPrice(getQueryParams().sort);
        // console.log(".........",getQueryParams().sort);
        if (result.success === true) {
          res.writeHead(200, { "Content-Type": "application/json" });
          // res.write(success("successfully get all the data", JSON.stringify(result.data)));
          res.write(JSON.stringify({ result }));
          return res.end();
          //console.log(result.data[0]);
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          // console.log("Here error");
          res.end(failure("Can not get data"));
          // return res.end();
        }
      } catch (error) {
        // console.log("body");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("server error")));
        // return res.end();
      }
    }

    ////------------------------------getting favorite author by userID------------------------------------------
    else if (requestURL === "/products/gettingFavAuthByUserID" && req.method === "GET") {
      try {
        const result = await Product.gettingFavAuthByUserID(getQueryParams().id);
        // console.log(".........",getQueryParams().sort,getQueryParams().id);
        if (result.success === true) {
          res.writeHead(200, { "Content-Type": "application/json" });
          // res.write(success("successfully get all the data", JSON.stringify(result.data)));
          res.write(JSON.stringify({ result }));
          return res.end();
          //console.log(result.data[0]);
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          // console.log("Here error");
          res.end(failure("Can not get data"));
          // return res.end();
        }
      } catch (error) {
        // console.log("body");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("server error")));
        // return res.end();
      }
    }

    ////------------------------------getting Top average rated manga------------------------------------------
    else if (requestURL === "/products/getTopManga" && req.method === "GET") {
      try {
        const result = await Product.getHighestRatedMangas(getQueryParams().numberOfManga);
        console.log(".........number of manga",getQueryParams().numberOfManga);
        if (result.success === true) {
          res.writeHead(200, { "Content-Type": "application/json" });
          // res.write(success("successfully get all the data", JSON.stringify(result.data)));
          res.write(JSON.stringify({ result }));
          return res.end();
          //console.log(result.data[0]);
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          // console.log("Here error");
          res.end(failure("Can not get data"));
          // return res.end();
        }
      } catch (error) {
        // console.log("body");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(failure("server error")));
        // return res.end();
      }
    }
     
    else {
      res.writeHead(500, { "Content-type": "application/json" });
      res.write(JSON.stringify({ message: "URL or method error" }));
      return res.end();
    }
  });
});

server.listen(8000, () => {
  console.log("Server is running on 8000..");
});
