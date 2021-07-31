const Router = require("express").Router();
const {
  getBook,
  addBook,
  delBook,
} = require("../controllers/books.controller");
const { vAddBook } = require("../validators/books.validators");

Router.get("/getBook/:id", getBook);
Router.delete("/delBook/:id", delBook);
Router.post("/getBook/", vAddBook, addBook);

module.exports = Router;
