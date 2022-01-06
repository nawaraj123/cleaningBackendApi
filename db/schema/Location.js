const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    shortid: {
      type: String,
      default: shortid.generate,
    },
    name: {
      type: String,
    },
    rate: {
      type: Number,
    },
    address: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
