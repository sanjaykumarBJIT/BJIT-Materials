const { log } = require("console");
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
        );
        return { success: true, data: JSON.parse(data) };
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
        );
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
        );
        return fsPromise
          .writeFile(
            path.join(__dirname, "..", "data", "manga.json"),
            JSON.stringify(jsonData)
          )
          .then(() => {
            return { success: true };
          })
          .catch((err) => {
            return { success: false, errors: "Failed to add file" };
          });
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
  async deleteById(id) {
    console.log(id + ".....");
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        // console.log(data);
        const index = JSON.parse(data).findIndex((ele) => ele.id === +id);
        console.log(index);
        if (index === -1) {
          // console.log("id nai");
          return { success: true, errors: "Id does not exist" };
        } else {
          console.log("hereeeeeeeeeeeeeeeeee");
          const newJsonData = JSON.parse(data).filter(
            (element) => element.id != Number(id)
          );
          // console.log(findData);
          console.log("hereeee");
          return fsPromise
            .writeFile(
              path.join(__dirname, "..", "data", "manga.json"),
              JSON.stringify(newJsonData)
            )
            .then(() => {
              console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
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
              );
              return { success: true, data: newJsonData };
            })
            .catch((err) => {
              return { success: false, errors: "Failed to add file" };
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
  async updateById(id, body) {
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
    console.log(id + ".....");
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        const jsonData = JSON.parse(data);
        const index = jsonData.findIndex((ele) => ele.id === +id);
        let a = JSON.parse(body);
        if (id != -1) {
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
          );
        }
        // console.log(findData);
        return fsPromise
          .writeFile(
            path.join(__dirname, "..", "data", "manga.json"),
            JSON.stringify(jsonData)
          )
          .then(() => {
            return { success: true };
          })
          .catch((err) => {
            return { success: false, errors: "Failed to add file" };
          });
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
  async getTotal() {
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf8",
      })
      .then((data) => {
        const TotalValue = JSON.parse(data).reduce((total, manga) => {
          return total + (manga.price * manga.stock);
        }, 0);
      
        console.log("Total Value of Mangas:", TotalValue);
        return { success: true, data: TotalValue };
      })
      .catch((error) => {
        console.log(error);
        console.log("data not fetched");
        return { success: false };
      });
  }
  async getProductsByUserId(id) {
    let matchingData = [];
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "user.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        const productsArray = JSON.parse(data).filter(
          (element) => element.id === Number(id)
        )[0];

        // console.log(".................",findData.bought_product_ids);

        return fsPromise
          .readFile(path.join(__dirname, "..", "data", "manga.json"), {
            encoding: "utf-8",
          })
          .then((data) => {
            for (const item of JSON.parse(data)) {
              if (productsArray.bought_product_ids.includes(item.id)) {
                // console.log("Matching Entry:", item);
                matchingData.push(item);
              }
            }
            // console.log(matchingData);
            return { success: true, data: matchingData };
          })
          .catch((err) => {
            return { success: false, errors: "Failed to add file" };
          });

        // return { success: true, data: findData.bought_product_ids };
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
  async sortingByPrice(sortingMethod) {
    // console.log(id+".....");
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        // console.log(data);
        if (sortingMethod === "asc") {
          const ascendingSortedData = JSON.parse(data)
            .slice()
            .sort((a, b) => a.price - b.price);
          console.log("Ascending Sorted Data:", ascendingSortedData);
          return { success: true, data: ascendingSortedData };
        } else if (sortingMethod === "desc") {
          const descendingSortedData = JSON.parse(data)
            .slice()
            .sort((a, b) => b.price - a.price);
          console.log("Descending Sorted Data:", descendingSortedData);
          return { success: true, data: descendingSortedData };
        } else {
          return { success: true, errors: "Bad request" };
        }
      })
      .catch((error) => {
        // console.log(error);
        return { success: false };
      });
  }
  async gettingFavAuthByUserID(id) {
    let matchingDataaa = [];
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "user.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        // console.log(data);
        const index = JSON.parse(data).findIndex((ele) => ele.id === +id);
        // console.log(index);
        if (index === -1) {
          // console.log("id nai");
          return { success: true, errors: "Id does not exist" };
        } else {
          // console.log("hereeeeeeeeeeeeeeeeee");
          const productsArray = JSON.parse(data).filter(
            (element) => element.id === Number(id)
          )[0];
          console.log(productsArray);
          return fsPromise
            .readFile(path.join(__dirname, "..", "data", "manga.json"), {
              encoding: "utf-8",
            })
            .then((data) => {
              for (const item of JSON.parse(data)) {
                if (productsArray.bought_product_ids.includes(item.id)) {
                  // console.log("Matching Entry:", item);
                  matchingDataaa.push(item);
                }
              }
              console.log(matchingDataaa);
              // Calculating number of books per author
              const booksPerAuthor = {};
              matchingDataaa.forEach((book) => {
                if (booksPerAuthor[book.author]) {
                  booksPerAuthor[book.author]++;
                } else {
                  booksPerAuthor[book.author] = 1;
                }
              });

              console.log("Number of Books per Author:", booksPerAuthor);
              // Find the author with the highest number of books
              let mostFavoriteAuthor = null;
              let highestBookCount = 0;

              for (const author in booksPerAuthor) {
                if (booksPerAuthor[author] > highestBookCount) {
                  highestBookCount = booksPerAuthor[author];
                  mostFavoriteAuthor = author;
                }
              }

              console.log("Most Favortie author:", mostFavoriteAuthor);

              return {
                success: true,
                data: { booksPerAuthor, mostFavoriteAuthor },
              };
            })
            .catch((err) => {
              return { success: false, errors: "Failed to add file" };
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return { success: false };
      });
  }
  async getHighestRatedMangas(numberofMangas) {
    let highestRatedBook = "";
    let highestAverageRating = 0;
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "manga.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        console.log(".............", JSON.parse(data));

        JSON.parse(data).forEach((book) => {
          const totalRatings = book.reviews.reduce(
            (total, reviews) => total + reviews.rating,
            0
          );
          console.log(book.reviews.length,totalRatings);
          const averageRating = totalRatings / book.reviews.length;

          if (averageRating > highestAverageRating) {
            highestAverageRating = averageRating;
            highestRatedBook = book;
          }

          book.averageRating = averageRating;
        });
        console.log("Book with Highest Average Rating (Reviews):", highestRatedBook);

        return { success: true, data: { highestRatedBook } };
      })
      .catch((err) => {
        return { success: false, errors: "Failed to add file" };
      });
  }
  
}

module.exports = new Product();
