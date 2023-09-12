const express = require("express");
const routes = express();
const AuthController = require("../controller/AuthController");
const ProductController = require("../controller/ProductController");
const transactionController = require("../controller/TransactionController");
const validator = require("../middleware/validation");


routes.post("/login", validator.signin, AuthController.login);
routes.post("/signup", validator.signup, AuthController.signup);


module.exports = routes;