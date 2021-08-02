const Router = require("express").Router();
const upload = require("../middlewares/uploadMw");

const {
  getBook,
  addBook,
  delBook,
} = require("../controllers/books.controller");
const { vAddBook } = require("../validators/books.validators");

Router.get("/getBook/:id", getBook);
Router.delete("/delBook/:id", delBook);
Router.post("/addBook/", upload("books").single("cover"), vAddBook, addBook);

module.exports = Router;
