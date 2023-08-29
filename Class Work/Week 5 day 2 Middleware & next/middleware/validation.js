const { failure } = require("../util/common");

const createValidation = (req, res, next) => {
  const { name, price, stock, author } = req.body;
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
      // return { success: false, error: errors };
      res.status(400).send(failure("Validation error",errors));
    }

    next();
};

const updateValidation = (req, res, next) => {
  const { name, price, stock, author } = req.body;
    const errors = {};

    if (name === "") {
      errors.name = "Manga name was not provided";
    }
    if (price === "" || price < 0) {
      errors.price = "invalid price";
    }
    if (stock === "" || stock == 0) {
      errors.stock = "stock should be greater than 0";
    }
    if (author === "") {
      errors.author = "Author name was not provided";
    }
    if (Object.keys(errors).length > 0) {
      return { success: false, error: errors };
    }
    if (Object.keys(errors).length > 0) {
      // return { success: false, error: errors };
      res.status(400).send(failure("Validation error",errors));
    }

    next();
}

module.exports = createValidation,updateValidation;
