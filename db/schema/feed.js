const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;

const feedSchema = new Schema(
  {
    shortid: {
      type: String,
      default: shortid.generate,
    },
    subject: {
      type: String,
    },
    description: {
      type: Number,
    },
    users: [{
      type: Schema.Types.ObjectId,
      ref: "user"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", feedSchema);