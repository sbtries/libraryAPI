const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = Schema(
  {
    usertitlename: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
      required: true
    },
    user: {
        ref: "User",
        type: ObjectId,
        required: false,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
