const Router = require("express").Router();
const upload = require("../middlewares/uploadMw");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

const {
  getBook,
  getBooks,
  addBook,
  delBook,
} = require("../controllers/books.controller");
const { vAddBook } = require("../validators/books.validators");

Router.get("/getBook/:id", getBook);
Router.get("/getBooks", getBooks);
Router.delete("/delBook/:id", delBook);
Router.post("/addBook/", upload("books").single("cover"), vAddBook, addBook);

module.exports = Router;
