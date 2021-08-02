const { body } = require("express-validator");
const validate = require("../middlewares/validate");

exports.vAddBook = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title can't be empty")
    .custom((title, { req }) => {
      const regex = /[<>]/;
      if (!regex.test(title)) return true;
      else throw Error("Title contains invalid characters");
    })
    .trim()
    .escape(),
  body("author")
    .not()
    .isEmpty()
    .withMessage("Author can't be empty")
    .custom((author, { req }) => {
      const regex = /[<>?@!&^]/;
      if (!regex.test(author)) return true;
      else throw Error("Author name contains invalid characters");
    })
    .trim()
    .escape(),
  body("desc")
    .not()
    .isEmpty()
    .withMessage("Desc can't be empty")
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
  body("min")
    .isNumeric()
    .withMessage("Minimum age can't contian non-numeric values"),
  body("max")
    .isNumeric()
    .withMessage("Maimum age can't contian non-numeric values"),
  validate,
];
