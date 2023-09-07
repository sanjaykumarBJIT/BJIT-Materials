const { validationResult } = require("express-validator");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const UserModel = require("../model/user");
const transactionModel = require("../model/transaction");
const mongoose = require("mongoose");
const HTTP_STATUS = require("../constants/statusCodes");

class Product {
  
  //Search filter with pagination

  async filterProducts(req, res) {
    try {
      const Validation = validationResult(req).array();
      if (Validation.length > 0) {
        return res.status(422).send(failure("Invalid input", Validation));
      }

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
        limit = 3;
      }

      if (page < 1 && limit < 0) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
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
}

module.exports = new Product();
