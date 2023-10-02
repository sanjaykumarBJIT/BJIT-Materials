const express = require("express");
const routes = express();
const ProductController = require("../controller/ProductController");
const transactionController = require("../controller/TransactionController");
const validator = require("../middleware/validation");
// const updateValidation = require("../middleware/validation");

routes.get("/getAll", ProductController.getAll);
// routes.get("/getByID", ProductController.getOneById);
routes.post("/create", ProductController.create);
routes.delete("/deleteById", ProductController.deleteById);
routes.put("/updateByName", ProductController.updateByName);
routes.get("/filterProducts", ProductController.filterProducts);
// routes.get("/getAllTransaction", transactionController.getAllTransaction);
// routes.post("/create", validator.createValidation, ProductController.createTransaction);


module.exports = routes;