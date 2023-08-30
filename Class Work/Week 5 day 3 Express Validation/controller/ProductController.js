const { validationResult } = require("express-validator");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");

class Product {
  //--------------------------Get All----------------------
  async getAll(req, res) {
    try {
      const products = await ProductModel.getAll();
      return res
        .status(200)
        .send(success("Successfully received all products", products));
    } catch (error) {
      return res.status(500).send(failure("Internal server error"));
    }
  }

  //-----------------------------getOneById------------------
  async getOneById(req, res) {
    try {
      const { id } = req.query;
      console.log(".....", id);
      const result = await ProductModel.getOneById(id);
      console.log(result);
      if (result.success) {
        console.log(result);
        return res
          .status(200)
          .send(success("Data fetched successfully", result.data));
      } else {
        return res.status(400).send(failure("ID does not exist"));
      }
    } catch (error) {
      return res.status(500).send(failure("server error"));
    }
  }

  //-------------------------Create---------------------------
  async create(req, res) {
    try {
      // console.log("bodyyy", req.body);
      const Validation = validationResult(req).array();
      console.log(Validation);
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }
      const result = await ProductModel.create(req.body);
      console.log(result);
      // console.log("adadadad",result);
      if (result.success) {
        console.log(result);
        return res
          .status(200)
          .send(success("Data created successfully", req.body));
      } else {
        return res.status(400).send(failure(result.error));
      }
    } catch (error) {
      return res.status(500).send(failure("serverrr error"));
    }
  }

  //-------------------------delete by ID---------------------------------------------
  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductModel.deleteById(id);
      if (result.success === true && result.errors !== undefined) {
        console.log(result);
        return res
          .status(400)
          .send(failure("Id not valid, Can not delete data"));
      } else if (result.success === true && result.data !== undefined) {
        return res
          .status(200)
          .send(success("id: " + id + " was successfully deleted"));
      }
    } catch (error) {
      return res.status(500).send(failure("server error"));
    }
  }

  //--------------------------------update by ID---------------------------------------------
  async updateById(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductModel.updateById(id, req.body);
      if (result.success) {
        console.log(result);
        return res
          .status(200)
          .send(success("successfully updated data", result));
      } else {
        return res
          .status(400)
          .send(failure("Can not update the data", result.error));
      }
    } catch (error) {
      return res.status(500).send(failure("server error"));
    }
  }

  async getTotal(req, res) {
    try {
      const result = await ProductModel.getTotal();
      console.log(success);
      if (result.success) {
        return res.status(200).send(success("Get all works", result.data));
      } else {
        return res.status(400).send(failure("Failed to fetch data"));
      }
    } catch (error) {
      console.log("Here catch");
      return res.status(500).send(failure("Server failed"));
      // return res.end();
    }
  }

  async getProductsByUserId(req, res) {
    try {
      const { id } = req.params;
      console.log("....", id);
      const result = await ProductModel.getProductsByUserId(id);
      console.log(success);
      if (result.success === true) {
        return res.status(200).send(success("Get all works", result));
      } else {
        return res.status(400).send(failure("User ID does not exist"));
      }
    } catch (error) {
      console.log("Here catch", error);
      return res.status(500).send(failure("Server failed"));
      // return res.end();
    }
  }

  //--------------------------------Sorting By Price---------------------------------------------
  async sortingByPrice(req, res) {
    try {
      const { sortingMethod } = req.query;
      //   console.log("....",id);
      const result = await ProductModel.sortingByPrice(sortingMethod);
      console.log(success);
      if (result.success === true) {
        return res.status(200).send(success("Most Favorite Author", result));
      } else {
        return res.status(400).send(failure("Sorting can not done"));
      }
    } catch (error) {
      console.log("Here catch", error);
      return res.status(500).send(failure("Server failed"));
    }
  }

  async gettingFavAuthByUserID(req, res) {
    try {
      const { id } = req.query;
      //   console.log("....",id);
      const result = await ProductModel.gettingFavAuthByUserID(id);
      console.log(success);
      if (result.success === true) {
        return res.status(200).send(success("Favorite Authors are:", result));
      } else {
        return res.status(400).send(failure("User ID does not exist"));
      }
    } catch (error) {
      console.log("Here catch", error);
      return res.status(500).send(failure("Server failed"));
    }
  }

  async getHighestRatedMangas(req, res) {
    try {
      const { numberOfManga } = req.query;
      //   console.log("....",id);
      const result = await ProductModel.getHighestRatedMangas(numberOfManga);
      console.log(success);
      if (result.success === true) {
        return res
          .status(200)
          .send(success("Average Highest rated Manga:", result));
      } else {
        return res
          .status(400)
          .send(failure("Can not get the highest rated manga"));
      }
    } catch (error) {
      console.log("Here catch", error);
      return res.status(500).send(failure("Server failed"));
    }
  }

  //------------------------------Filtering Products----------------------------
  async filterProducts(req, res) {
    try {
      let sack = {};
      let flag = false;
      const Validation = validationResult(req).array();
      console.log(Validation)
      if (Validation.length == 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }
      // console.log(Validation[0].path);

      Validation.forEach((product) => {
        if (product.value != undefined) {
          const x = product.path;
          sack[product.path] = product.value;
          flag = true;
        }
      });

      if(!flag){
        return res.status(422).send(failure("Invalid input, no parameters provided"));
      }

      const result = await ProductModel.filterProducts();

      if (result.success === true) {
        const filteredProducts = result.data.filter((product) => {
          const criteria = [];

          if (sack.maxPrice) {
            criteria.push(product.price <= parseFloat(sack.maxPrice));
          }
          if (sack.minPrice) {
            criteria.push(product.price >= parseFloat(sack.minPrice));
          }
          if (sack.MinReleaseDate) {
            criteria.push(product.releaseDate >= parseInt(sack.MinReleaseDate));
          }
          if (sack.maxReleaseDate) {
            criteria.push(product.releaseDate <= parseInt(sack.maxReleaseDate));
          }
          if (sack.publisher) {
            criteria.push(product.publisher === sack.publisher);
          }

          return criteria.every((condition) => condition);
        });
        return res
          .status(200)
          .send(success("All filtered Mangas:", filteredProducts));
      } else {
        return res
          .status(400)
          .send(failure("No Such manga Can be found"));
      }
    } catch (error) {
      console.log("Here catch", error);
      return res.status(500).send(failure("Server failed"));
    }
  }
}

module.exports = new Product();
