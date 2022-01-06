const shortid = require("shortid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blockSchema = new Schema(
  {
    shortid: {
      type: String,
      default: shortid.generate,
    },
    name: {
      type: String,
    },
    rooms: [
      {
        type: Number,
      },
    ],
    extras: [
      {
        type:String,
      }
    ],
    location: {
      type: Schema.Types.ObjectId,
      ref:"Location"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Block", blockSchema);
