const { failure } = require("../util/common");
const {body, query, param} = require("express-validator");


const validator = {
  createValidation: [
    body("price")
    .exists()
    .withMessage("This request must contain price property")
    .custom((value, {req,res}) => {
      if(value<=0){
        throw new Error("Rating must be greater or equal than 0");
      }
      return true;
    }),

    body("name")
    .exists()
    .withMessage("This request must contain Name property")
    .not()
    .equals("")
    .withMessage("Name was not provided in the property"),

    body("stock")
    .exists()
    .withMessage("This request must contain stock property")
    .not()
    .equals("")
    .withMessage("stock was not provided in the property")
    .not()
    .equals(0)
    .withMessage("stock was not provided in the property"),

    body("author")
    .exists()
    .withMessage("This request must contain author property")
    .not()
    .equals("")
    .withMessage("author was not provided in the property"),
  ],


  updateValidation: [
    body("price")
    .custom((value, {req,res}) => {
      if(value<=0){
        throw new Error("Rating must be greater or equal than 0");
      }
      return true;
    }),

    body("name")
    .not()
    .equals("")
    .withMessage("Name was not provided in the property"),

    body("stock")
    .not()
    .equals("")
    .withMessage("stock was not provided in the property")
    .not()
    .equals(0)
    .withMessage("stock was not provided in the property"),

    body("author")
    .not()
    .equals("")
    .withMessage("author was not provided in the property"),
  ],

  filterValidation: [
    query("minPrice")
    .exists()
    .withMessage("This request must contain Name property")
    .equals("")
    .withMessage("minPrice was provided in the property"),

    query("maxPrice")
    .exists()
    .withMessage("This request must contain Name property")
    .equals("")
    .withMessage("maxPrice was provided in the property"),

    query("maxReleaseDate")
    .exists()
    .withMessage("This request must contain Name property")
    .equals("")
    .withMessage("maxReleaseDate was provided in the property"),

    query("MinReleaseDate")
    .exists()
    .withMessage("This request must contain Name property")
    .equals("")
    .withMessage("minReleaseDate was provided in the property"),

    query("availability")
    .exists()
    .withMessage("This request must contain Name property")
    .equals("")
    .withMessage("availability was provided in the property"),

    query("publisher")
    .exists()
    .withMessage("This request must contain Name property")
    .equals("")
    .withMessage("publisher was provided in the property"),


  ],
}

// const createValidation = (req, res, next) => {
//   const { name, price, stock, author } = req.body;
//     const errors = {};

//     if (!name || name === "") {
//       errors.name = "Manga name was not provided";
//     }
//     if (!price || price === "" || price < 0) {
//       errors.price = "invalid price";
//     }
//     if (!stock || stock === "" || stock == 0) {
//       errors.stock = "stock should be greater than 0";
//     }
//     if (!author || author === "") {
//       errors.author = "Author name was not provided";
//     }
//     if (Object.keys(errors).length > 0) {
//       // return { success: false, error: errors };
//       res.status(400).send(failure("Validation error",errors));
//     }

//     next();
// };

// const updateValidation = (req, res, next) => {
//   const { name, price, stock, author } = req.body;
//     const errors = {};

//     if (name === "") {
//       errors.name = "Manga name was not provided";
//     }
//     if (price === "" || price < 0) {
//       errors.price = "invalid price";
//     }
//     if (stock === "" || stock == 0) {
//       errors.stock = "stock should be greater than 0";
//     }
//     if (author === "") {
//       errors.author = "Author name was not provided";
//     }
//     if (Object.keys(errors).length > 0) {
//       return { success: false, error: errors };
//     }
//     if (Object.keys(errors).length > 0) {
//       // return { success: false, error: errors };
//       res.status(400).send(failure("Validation error",errors));
//     }

//     next();
// }

// module.exports = createValidation,updateValidation;
module.exports = validator;
