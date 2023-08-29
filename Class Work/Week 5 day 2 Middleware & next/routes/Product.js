const express = require("express");
const routes = express();
const ProductController = require("../controller/ProductController");
const createValidation = require("../middleware/validation");
const updateValidation = require("../middleware/validation");

routes.get("/getAll", ProductController.getAll);
routes.get("/getByID", ProductController.getOneById);
routes.post("/create", createValidation, ProductController.create);
routes.delete("/deleteById/:id", ProductController.deleteById);
routes.put("/updateById/:id", updateValidation, ProductController.updateById);
routes.get("/getTotalValue", ProductController.getTotal);
routes.get("/getProductsUsingUserID/:id", ProductController.getProductsByUserId);
routes.get("/sortingByPrice", ProductController.sortingByPrice);
routes.get("/gettingFavAuthByUserID", ProductController.gettingFavAuthByUserID);
routes.get("/getTopManga", ProductController.getHighestRatedMangas);

module.exports = routes;