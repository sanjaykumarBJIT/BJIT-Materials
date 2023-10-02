const { validationResult } = require("express-validator");
const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");
const transactionModel = require("../model/transaction");
const productModel = require("../model/Product");
const User = require("../model/user");

class TransactionProduct {
  async getAllTransaction(req, res) {
    try {
      let transactionResult = await transactionModel
        .find({})
        .populate("user", "-access")
        .populate("products.id", "-stock");
        let totalvalueList = [];
        // console.log(transactionResult.User._id);
      if (transactionResult.length > 0) {
        let totalValue = 0;

        for (const transaction of transactionResult) {
          for (const product of transaction.products) {
            const foundProduct = await productModel.findById(product.id);
            console.log(product.id);
            if (foundProduct) {
              totalValue = totalValue + foundProduct.price * product.quantity;
            }
          }
        //   console.log(transaction.user._id);
          totalvalueList.push({"User ID": transaction.user.name, "Total order amount ": totalValue });
          totalValue = 0;
        }

        transactionResult.push(totalvalueList);

        return res
          .status(200)
          .send(
            success("Successfully received all transactions", transactionResult)
          );
      } else {
        return res.status(400).send(success("Didn't received all products"));
      }
    } catch (error) {
      console.log("Found: " + error);
    }
  }
}

module.exports = new TransactionProduct();
