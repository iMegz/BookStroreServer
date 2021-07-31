const Book = require("../models/books.model");
const { Error } = require("mongoose");
const { deleteFile } = require("../utils/utils");

exports.getBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (err) {
    const isInvalidId = err instanceof Error.CastError;
    const ErrorCode = isInvalidId ? "INVALID_ID" : "DATABASE_ERROR";
    const StatusCode = isInvalidId ? 400 : 500;
    next({ StatusCode, ErrorCode, ErrorData: [] });
  }
};

exports.addBook = async (req, res, next) => {
  const { title, author, desc, amount, price, ageRange } = req.body;
  const cover = req.file;
  const book = new Book({
    title,
    author,
    desc,
    amount,
    price,
    ageRange,
    cover,
  });
  try {
    const addedBook = await book.save();
    res.status(201).json(addedBook);
  } catch (err) {
    next({ StatusCode: 500, ErrorCode: "DATABASE_ERROR", ErrorData: [] });
  }
};

exports.delBook = async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (book) deleteFile("books", book.cover);
    res.status(200).json(book);
  } catch (err) {
    const isInvalidId = err instanceof Error.CastError;
    const ErrorCode = isInvalidId ? "INVALID_ID" : "DATABASE_ERROR";
    const StatusCode = isInvalidId ? 400 : 500;
    next({ StatusCode, ErrorCode, ErrorData: [] });
  }
};
