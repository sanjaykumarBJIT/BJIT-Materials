const { validationResult } = require("express-validator");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const UserModel = require("../model/user");
const transactionModel = require("../model/transaction");
const mongoose = require("mongoose");

class Product {
  async filterProducts(req, res) {
    try {

      let product = ProductModel.find();    //Throws error if await is declared here!!!
      // product = product.toObject();

      console.log(product.length)
  
      // const products = await ProductModel.getAll();
      let totalData = 0;
      let {
        page,
        limit,
        sortOrder,
        sortParams,
        search,
        price,
        priceFill,
        stock,
        stockFill,
        releaseDate,
        releaseDateFill,
        authorNames,
      } = req.query;

      if (!page || !limit) {
        page = 1;
        limit = 10;
      }

      if (page < 1 && limit < 0) {
        return res
          .status(400)
          .send(failure("Page values must be => 1 and Limit can not be 0"));
      }
      // users = await ProductModel.find().skip((page - 1)*limit).limit(limit);
      console.log("page....", page);

      if (sortOrder && sortParams) {
        if (
          sortParams === "price" ||
          sortParams === "stock" ||
          sortParams === "name"
        ) {
          if (sortOrder === "asc") {
            const sort = {};
            sort[sortParams] = 1;
            product = product.sort(sort);


            // totalData = product.length;
            // console.log("totalData....",totalData)


          } else if (sortOrder === "desc") {
            const sort = {};
            sort[sortParams] = -1;
            product = product.sort(sort);
          } else {
            return res
              .status(400)
              .send(failure("Invalid Input at sortingOrder"));
          }
        } else {
          return res.status(400).send(failure("Invalid Input at sortParams"));
        }
      }

      if (stock && stockFill) {
        if (stockFill === "higher") {
          product = product.find({ stock: { $gt: stock } });
        } else if (stockFill === "lower") {
          product = product.find({ stock: { $lt: stock } });
        } else {
          return res.status(400).send(failure("Invalid Input at stockFill"));
        }
      }

      if (price && priceFill) {
        if (priceFill === "higher") {
          product = product.find({ price: { $gt: price } });
        } else if (priceFill === "lower") {
          product = product.find({ price: { $lt: price } });
        } else {
          return res.status(400).send(failure("Invalid Input at stockFill"));
        }
      }

      if (releaseDate && releaseDateFill) {
        if (releaseDateFill === "higher") {
          product = product.find({ releaseDate: { $gt: releaseDate } });
        } else if (releaseDateFill === "lower") {
          product = product.find({ releaseDate: { $lt: releaseDate } });
        } else {
          return res.status(400).send(failure("Invalid Input at stockFill"));
        }
      }

      if (search) {
        product = product.find({
          $or: [
            { name: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        });
      }

      if (authorNames) {
        const authors = authorNames.split(",");

        product = product.find({
          author: { $in: authors },
        });
      }

      // const totalProducts = await product.find().count();
      // let productCount = ProductModel.find().count();
      const skipAmount = (page - 1) * limit;
      product = product.skip(skipAmount).limit(limit);

      const filteredProducts = await product.exec();

      console.log(filteredProducts.length);
      if (filteredProducts.length > 0) {
        // console.log("length: "+filteredProducts+" per page: "+limit);
        return res
          .status(200)
          .send(
            success("Successfully received all products", filteredProducts)
          );
      }

      // console.log("length: "+filteredProducts.length+" per page: "+limit);
      return res.status(200).send(success("No Products were found"));
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(failure("Internal server error"));
    }
  }

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
      const Products = await ProductModel.find();
      if (Products.length > 0) {
        return res
          .status(200)
          .send(success("Successfully received all products", Products));
      }
      return res.status(400).send(success("No users found"));
    } catch (error) {
      // logMessage(error.message);
      return res.status(500).send(failure("Internal server error"));
    }
  }

  //-----------------------------getOneById------------------
  async getOneById(req, res) {
    try {
      const { id } = req.query;
      // console.log(".....", id);
      const users = await UserModel.findById({ _id: id });
      // console.log(users);
      if (users) {
        console.log("in", users);
        return res
          .status(200)
          .send(success("User fetched successfully", users));
      } else {
        return res.status(400).send(failure("ID does not exist"));
      }
    } catch (error) {
      // logMessage(error.message);
      return res.status(500).send(failure("server error"));
    }
  }

  //--------------------------------updateOne by ID---------------------------------------------
  async updateByName(req, res) {
    try {
      const { name } = req.query;
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { name: name },
        req.body,
        { new: true } // This ensures you get the updated product back
      );

      if (updatedProduct) {
        return res
          .status(200)
          .send(
            success(
              `Product with name: ${name} was successfully updated`,
              updatedProduct
            )
          );
      } else {
        return res
          .status(400)
          .send(failure(`Product with name: ${name} was not found`));
      }
    } catch (error) {
      return res.status(500).send(failure("Server error"));
    }
  }

  async create(req, res) {
    try {
      console.log("bodyyy", req.body);
      const result = await ProductModel.create(req.body);
      console.log(result);
      // console.log("adadadad",result);
      if (result) {
        console.log(result);
        return res
          .status(200)
          .send(success("Data created successfully", req.body));
      } else {
        return res.status(400).send(failure(result.error));
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("serverrr error"));
    }
  }

  //-------------------------deleteOne by ID---------------------------------------------
  async deleteById(req, res) {
    try {
      const { id } = req.query;
      console.log(id);
      const Id_exists = await ProductModel.findOne({ _id: id });
      console.log(Id_exists); // Use Id_exists here
      if (Id_exists) {
        const product = await ProductModel.deleteOne({ _id: id });
        return res
          .status(200)
          .send(success("id: " + id + " was successfully deleted"));
      } else {
        return res.status(400).send(success("id: " + id + " was not found"));
      }
    } catch (error) {
      return res.status(500).send(failure("server error"));
    }
  }

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
