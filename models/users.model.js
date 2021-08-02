const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  access: Number,
  status: {
    active: { type: Boolean, default: false },
    token: String,
    expireDate: Date,
  },
  profile: {
    firstname: String,
    lastname: String,
    gender: Boolean, //Male = true, Female = false
    profilePic: { type: String, default: "default" },
    birthday: Date,
  },
  address: {
    country: String,
    city: String,
    street: String,
    appartment: String,
  },
  booksOwened: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  cart: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  orders: [
    {
      delivered: Boolean,
      books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    },
  ],
});

module.exports = model("User", UserSchema);
