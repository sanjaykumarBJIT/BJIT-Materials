const express = require("express");
const routes = express();
const ProductController = require("../controller/ProductController");
const transactionController = require("../controller/TransactionController");
const validator = require("../middleware/validation");
const AuthValidator = require("../middleware/auth");
const FilterValidator = require("../middleware/filterValidation");
// const updateValidation = require("../middleware/validation");

// routes.get("/getAll", ProductController.getAll);
// routes.get("/getByID", ProductController.getOneById);
// routes.post("/create",AuthValidator.isAuthorized , validator.createProductValidation, ProductController.create);

routes.get("/filterProductsAdvanced", FilterValidator.filterValidation, ProductController.filterProducts);
// routes.delete("/deleteById", ProductController.deleteById);
// routes.put("/updateById", validator.updateValidation, ProductController.updateById);

// routes.get("/getAllTransaction", transactionController.getAllTransaction);
// routes.post("/create", validator.createValidation, ProductController.createTransaction);


module.exports = routes;