const { Schema, model } = require("mongoose");

const BookSchema = Schema({
  title: String,
  author: String,
  desc: String,
  cover: String,
  amount: Number,
  price: Number,
  ageRange: {
    min: Number,
    max: Number,
  },
});

module.exports = model("Book", BookSchema);
