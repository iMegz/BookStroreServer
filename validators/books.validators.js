const { body } = require("express-validator");
const validate = require("../middlewares/validate");

exports.vAddBook = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title can't be empty")
    .isAlphanumeric()
    .withMessage("Title must be alpha numeric")
    .trim()
    .escape(),
  body("author")
    .not()
    .isEmpty()
    .withMessage("Author can't be empty")
    .isAlphanumeric()
    .withMessage("Author must be alpha numeric")
    .trim()
    .escape(),
  body("desc")
    .not()
    .isEmpty()
    .withMessage("Desc can't be empty")
    .isAlphanumeric()
    .withMessage("Desc must be alpha numeric")
    .trim()
    .escape(),
  body("amount")
    .not()
    .isEmpty()
    .withMessage("Amount can't be empty")
    .isNumeric()
    .withMessage("Amount can't contian non-numeric values")
    .trim()
    .escape(),
  body("price")
    .not()
    .isEmpty()
    .withMessage("Price can't be empty")
    .isNumeric()
    .withMessage("Price can't contian non-numeric values")
    .trim()
    .escape(),
  body("ageRange.min")
    .isNumeric()
    .withMessage("Minimum age can't contian non-numeric values"),
  body("ageRange.max")
    .isNumeric()
    .withMessage("Maimum age can't contian non-numeric values"),
  validate,
];
