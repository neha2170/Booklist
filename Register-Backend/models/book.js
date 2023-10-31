const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    auther: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Book = mongoose.model("book", book);
module.exports = Book;
