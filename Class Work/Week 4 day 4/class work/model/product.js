const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

class Product {
  async getAll() {
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf8",
      })
      .then((data) => {
        const updatetime =
              "Checked at: Date: " +
              new Date().getDate() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getDay() +
              " Time: " +
              new Date().getTime();
            fs.appendFile(
              path.join(__dirname, "..", "data", "logFile.txt"),
              updatetime + "\n",
              "utf8",
              (err) => {
                if (err) {
                  console.error("Error writing Update file:", err);
                } else {
                  console.log("Update File written successfully.");
                }
              }
            )
        return { success: true, data: data };
      })
      .catch((error) => {
        console.log(error);
        console.log("data not fetched");
        return { success: false };
      });
  }
  async getOneById(id) {
    // console.log(id+".....");
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf-8",
      })
      .then((data) => {

        const findData = JSON.parse(data).filter(
          (element) => element.id === Number(id)
        )[0];
        // console.log(findData);
        const updatetime =
              "Checked by ID at: Date: " +
              new Date().getDate() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getDay() +
              " Time: " +
              new Date().getTime();
            fs.appendFile(
              path.join(__dirname, "..", "data", "logFile.txt"),
              updatetime + "\n",
              "utf8",
              (err) => {
                if (err) {
                  console.error("Error writing Update file:", err);
                } else {
                  console.log("Update File written successfully.");
                }
              }
            )
        return { success: true, data: findData };
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
  async create(body) {
    console.log(body);
    const { name, price, stock, author } = JSON.parse(body);
    const errors = {};

    if (!name || name === "") {
      errors.name = "Manga name was not provided";
    }
    if (!price || price === "" || price < 0) {
      errors.price = "invalid price";
    }
    if (!stock || stock === "" || stock == 0) {
      errors.stock = "stock should be greater than 0";
    }
    if (!author || author === "") {
      errors.author = "Author name was not provided";
    }
    if (Object.keys(errors).length > 0) {
      return { success: false, error: errors };
    }
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        const jsonData = JSON.parse(data);
        let a = JSON.parse(body);
        const newData = {
          ...a,
          id: jsonData[jsonData.length - 1].id + 1,
        };
        jsonData.push(newData);
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
              path.join(__dirname, "..", "data", "logFile.txt"),
              updatetime + "\n",
              "utf8",
              (err) => {
                if (err) {
                  console.error("Error writing Update file:", err);
                } else {
                  console.log("Update File written successfully.");
                }
              }
            )
        return fsPromise
          .writeFile(path.join(__dirname, "..", "data", "manga.json"), JSON.stringify(jsonData))
          .then( ()=>{
            return {success:true};
          })
          .catch((err) => {
            return {success:false, errors:"Failed to add file"};
          })
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
  async deleteById(id) {
    console.log(id+".....");
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        const newJsonData = JSON.parse(data).filter(
          (element) => element.id != Number(id)
        );
        // console.log(findData);
        return fsPromise
          .writeFile(path.join(__dirname, "..", "data", "manga.json"), JSON.stringify(newJsonData))
          .then( ()=>{
            const updatetime =
              "Deleted at: Date: " +
              new Date().getDate() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getDay() +
              " Time: " +
              new Date().getTime();
            fs.appendFile(
              path.join(__dirname, "..", "data", "logFile.txt"),
              updatetime + "\n",
              "utf8",
              (err) => {
                if (err) {
                  console.error("Error writing Update file:", err);
                } else {
                  console.log("Update File written successfully.");
                }
              }
            )
            return {success:true,data:newJsonData};
          })
          .catch((err) => {
            return {success:false, errors:"Failed to add file"};
          })
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
  async updateById(id,body) {
    console.log(id+".....");
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        const jsonData = JSON.parse(data);
        const index = jsonData.findIndex((ele) => ele.id === +id);
        let a = JSON.parse(body);
        if(id!=-1){
          jsonData[index] = { ...jsonData[index], ...a };
          const updatetime =
              "Updated at: Date: " +
              new Date().getDate() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getDay() +
              " Time: " +
              new Date().getTime();
            fs.appendFile(
              path.join(__dirname, "..", "data", "logFile.txt"),
              updatetime + "\n",
              "utf8",
              (err) => {
                if (err) {
                  console.error("Error writing Update file:", err);
                } else {
                  console.log("Update File written successfully.");
                }
              }
            )
        }
        // console.log(findData);
        return fsPromise
          .writeFile(path.join(__dirname, "..", "data", "manga.json"), JSON.stringify(jsonData))
          .then( ()=>{
            return {success:true};
          })
          .catch((err) => {
            return {success:false, errors:"Failed to add file"};
          })
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
}

module.exports = new Product();
