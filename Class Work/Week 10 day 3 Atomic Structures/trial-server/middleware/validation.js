const { failure } = require("../util/common");
const {body, query, param} = require("express-validator");


const validator = {
  createValidation: [
    body("age")
    .exists()
    .withMessage("This request must contain age property")
    .custom((value, {req,res}) => {
      if(value<=0){
        throw new Error("age must be greater or equal than 0");
      }
      return true;
    }),

    body("name")
    .exists()
    .withMessage("This request must contain Name property")
    .not()
    .equals("")
    .withMessage("Name was not provided in the property"),

    body("access")
    .exists()
    .withMessage("This request must contain access property")
    .not()
    .equals("")
    .withMessage("access was not provided in the property")
    .not()
    .equals(0)
    .withMessage("stock was not provided in the property"),

    body("email")
    .exists()
    .withMessage("This request must contain email property")
    .not()
    .equals("")
    .withMessage("author was not provided in the property"),

    body("userName")
    .exists()
    .withMessage("This request must contain userName property")
    .not()
    .equals("")
    .withMessage("userName was not provided in the property"),
  ],


  updateValidation: [
    body("age")
    .optional()
    .custom((value, {req,res}) => {
      if(value<=0){
        throw new Error("age must be greater or equal than 0");
      }
      return true;
    }),

    body("name")
    .optional()
    .not()
    .equals("")
    .withMessage("Name was not provided in the property"),

    body("access")
    .optional()
    .not()
    .equals("")
    .withMessage("access was not provided in the property")
    .not()
    .equals(0)
    .withMessage("stock was not provided in the property"),

    body("email")
    .optional()
    .not()
    .equals("")
    .withMessage("author was not provided in the property"),

    body("userName")
    .optional()
    .not()
    .equals("")
    .withMessage("userName was not provided in the property"),
  ],
}

module.exports = validator;
