const { validationResult } = require("express-validator");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const UserModel = require("../model/user");
const transactionModel = require("../model/transaction");
const mongoose = require("mongoose");

class Product {
  //-------------------------Create---------------------------
  // async createTransaction(req, res) {
  //   try {
  //     const { user, products } = req.body;

  //     const productId = products.map((ele) => ele.id);

  //     const isValidProductIds = products.every((ele) =>
  //       mongoose.Types.ObjectId.isValid(ele.id)
  //     );

  //     let productsData;
  //     if (!isValidProductIds) {
  //       console.log("One or more product IDs are invalid.");
  //     } else {
  //       productsData = await ProductModel.find({
  //         _id: { $in: productId },
  //       });

  //       console.log("Products Data:", productsData);
  //     }

  //     // console.log(".....................", gg);
  //     if (productsData) {
  //       const newTransactions = await transactionModel.create({
  //         user,
  //         products,
  //       });
  //       // console.log(newTransactions);

  //       if (newTransactions) {
  //         return res
  //           .status(200)
  //           .send(success("Successfully created new transaction"));
  //       }
  //     } else {
  //       return res.status(400).send(success("Product id invalid"));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send(failure("internal server error"));
  //   }
  // }

  //--------------------------Get All----------------------
  async getAll(req, res) {
    try {
      // const products = await ProductModel.getAll();
      const users = await ProductModel.find();
      if (users.length > 0) {
        return res
          .status(200)
          .send(success("Successfully received all products", users));
      }
      return res.status(200).send(success("No users found"));
    } catch (error) {
      // logMessage(error.message);
      return res.status(500).send(failure("Internal server error"));
    }
  }

  //-------------------------Create---------------------------
  async create(req, res) {
    try {
      // const jwtVerification = jwt.decode(req.body.tok, process.env.SECRET_KEY, algorithms=["HS256"]);

      const Validation = validationResult(req).array();
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }

      const { name, price, stock, releaseDate, author } = req.body;
      const user = await ProductModel.insertMany({
        name,
        price,
        stock,
        releaseDate,
        author,
      });
      return res
        .status(200)
        .send(success("Product created successfully", req.body));
    } catch (error) {
      console.log(error);
      // logMessage(error.message);
      return res.status(500).send(failure("server error"));
    }
  }

  // //-----------------------------getOneById------------------
  // async getOneById(req, res) {
  //   try {
  //     const { id } = req.query;
  //     // console.log(".....", id);
  //     const users = await UserModel.findById({ _id: id });
  //     // console.log(users);
  //     if (users) {
  //       console.log("in", users);
  //       return res
  //         .status(200)
  //         .send(success("User fetched successfully", users));
  //     } else {
  //       return res.status(400).send(failure("ID does not exist"));
  //     }
  //   } catch (error) {
  //     // logMessage(error.message);
  //     return res.status(500).send(failure("server error"));
  //   }
  // }

  // //--------------------------------updateOne by ID---------------------------------------------
  // async updateById(req, res) {
  //   try {
  //     const Validation = validationResult(req).array();

  //     if (Validation.length > 0) {
  //       return res.status(422).send(failure("Invalid input", Validation));
  //     }
  //     const { id } = req.query;
  //     console.log(id);
  //     const user = await UserModel.updateOne({ _id: id }, { $set: req.body });
  //     return res
  //       .status(200)
  //       .send(success("successfully updated data", req.body));
  //   } catch (error) {
  //     console.log(error);
  //     // logMessage(error.message);
  //     return res.status(500).send(failure("server error"));
  //   }
  // }

  // //-------------------------deleteOne by ID---------------------------------------------
  // async deleteById(req, res) {
  //   try {
  //     const { id } = req.query;
  //     console.log(id);
  //     const Id_exists = await UserModel.findOne({ _id: id });
  //     console.log(exist);
  //     if (Id_exists) {
  //       const user = await UserModel.deleteOne({ _id: id });
  //       return res
  //         .status(200)
  //         .send(success("id: " + id + " was successfully deleted"));
  //     } else {
  //       return res.status(400).send(success("id: " + id + " was not found"));
  //     }
  //   } catch (error) {
  //     logMessage(error.message);
  //     return res.status(500).send(failure("server error"));
  //   }
  // }

  // async getTotal(req, res) {
  //   try {
  //     const result = await ProductModel.getTotal();
  //     console.log(success);
  //     if (result.success) {
  //       return res.status(200).send(success("Get all works", result.data));
  //     } else {
  //       return res.status(400).send(failure("Failed to fetch data"));
  //     }
  //   } catch (error) {
  //     console.log("Here catch");
  //     return res.status(500).send(failure("Server failed"));
  //     // return res.end();
  //   }
  // }

  // async getProductsByUserId(req, res) {
  //   try {
  //     const { id } = req.params;
  //     console.log("....", id);
  //     const result = await ProductModel.getProductsByUserId(id);
  //     console.log(success);
  //     if (result.success === true) {
  //       return res.status(200).send(success("Get all works", result));
  //     } else {
  //       return res.status(400).send(failure("User ID does not exist"));
  //     }
  //   } catch (error) {
  //     console.log("Here catch", error);
  //     return res.status(500).send(failure("Server failed"));
  //     // return res.end();
  //   }
  // }

  // //--------------------------------Sorting By Price---------------------------------------------
  // async sortingByPrice(req, res) {
  //   try {
  //     const { sortingMethod } = req.query;
  //     //   console.log("....",id);
  //     const result = await ProductModel.sortingByPrice(sortingMethod);
  //     console.log(success);
  //     if (result.success === true) {
  //       return res.status(200).send(success("Most Favorite Author", result));
  //     } else {
  //       return res.status(400).send(failure("Sorting can not done"));
  //     }
  //   } catch (error) {
  //     console.log("Here catch", error);
  //     return res.status(500).send(failure("Server failed"));
  //   }
  // }

  // async gettingFavAuthByUserID(req, res) {
  //   try {
  //     const { id } = req.query;
  //     //   console.log("....",id);
  //     const result = await ProductModel.gettingFavAuthByUserID(id);
  //     console.log(success);
  //     if (result.success === true) {
  //       return res.status(200).send(success("Favorite Authors are:", result));
  //     } else {
  //       return res.status(400).send(failure("User ID does not exist"));
  //     }
  //   } catch (error) {
  //     console.log("Here catch", error);
  //     return res.status(500).send(failure("Server failed"));
  //   }
  // }

  // async getHighestRatedMangas(req, res) {
  //   try {
  //     const { numberOfManga } = req.query;
  //     //   console.log("....",id);
  //     const result = await ProductModel.getHighestRatedMangas(numberOfManga);
  //     console.log(success);
  //     if (result.success === true) {
  //       return res
  //         .status(200)
  //         .send(success("Average Highest rated Manga:", result));
  //     } else {
  //       return res
  //         .status(400)
  //         .send(failure("Can not get the highest rated manga"));
  //     }
  //   } catch (error) {
  //     console.log("Here catch", error);
  //     return res.status(500).send(failure("Server failed"));
  //   }
  // }

  // //------------------------------Filtering Products----------------------------
  // async filterProducts(req, res) {
  //   try {
  //     let sack = {};
  //     let flag = false;
  //     const Validation = validationResult(req).array();
  //     console.log(Validation)
  //     if (Validation.length == 0) {
  //       return res.status(422).send(failure("Invalid input", Validation));
  //     }
  //     // console.log(Validation[0].path);

  //     Validation.forEach((product) => {
  //       if (product.value != undefined) {
  //         const x = product.path;
  //         sack[product.path] = product.value;
  //         flag = true;
  //       }
  //     });

  //     if(!flag){
  //       return res.status(422).send(failure("Invalid input, no parameters provided"));
  //     }

  //     const result = await ProductModel.filterProducts();

  //     if (result.success === true) {
  //       const filteredProducts = result.data.filter((product) => {
  //         const criteria = [];

  //         if (sack.maxPrice) {
  //           criteria.push(product.price <= parseFloat(sack.maxPrice));
  //         }
  //         if (sack.minPrice) {
  //           criteria.push(product.price >= parseFloat(sack.minPrice));
  //         }
  //         if (sack.MinReleaseDate) {
  //           criteria.push(product.releaseDate >= parseInt(sack.MinReleaseDate));
  //         }
  //         if (sack.maxReleaseDate) {
  //           criteria.push(product.releaseDate <= parseInt(sack.maxReleaseDate));
  //         }
  //         if (sack.publisher) {
  //           criteria.push(product.publisher === sack.publisher);
  //         }

  //         return criteria.every((condition) => condition);
  //       });
  //       return res
  //         .status(200)
  //         .send(success("All filtered Mangas:", filteredProducts));
  //     } else {
  //       return res
  //         .status(400)
  //         .send(failure("No Such manga Can be found"));
  //     }
  //   } catch (error) {
  //     console.log("Here catch", error);
  //     return res.status(500).send(failure("Server failed"));
  //   }
  // }
}

module.exports = new Product();
