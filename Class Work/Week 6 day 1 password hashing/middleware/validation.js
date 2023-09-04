const { failure } = require("../util/common");
const { body, query, param } = require("express-validator");

const validator = {
  createValidation: [
    body("age")
      .exists()
      .withMessage("This request must contain age property")
      .custom((value, { req, res }) => {
        if (value <= 0) {
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
      .custom((value, { req, res }) => {
        if (value <= 0) {
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

  signup: [
    body("email")
      .exists()
      .withMessage("Email must be Provided in the field")
      .bail()
      .isString()
      .withMessage("Email Must be a string")
      .bail()
      .isEmail()
      .withMessage("Email must be in valid format"),
    body("password")
      .exists()
      .withMessage("Password must be provided")
      .bail()
      .isString()
      .withMessage("Password must be a string")
      .bail()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      }),
    body("name")
      .exists()
      .withMessage("name must be provided")
      .bail()
      .isString()
      .withMessage("name must be a string"),
    body("phoneNo")
      .exists()
      .withMessage("phoneNo must be provided")
      .bail()
      .isNumeric()
      .withMessage("phoneNo must be a string"),
  ],
  signin: [
    body("email")
      .not()
      .equals("")
      .withMessage("Email must be Provided in the field")
      .bail()
      .isEmail()
      .withMessage("Email must be in a valid format")
      .bail()
      .isString()
      .withMessage("Email must be a string"),
    body("password")
    .exists()
      .not()
      .equals("")
      .withMessage("Password must be provided")
      .bail()
      .isString()
      .withMessage("Password must be a string"),
  ],
};

module.exports = validator;
