const shortid = require("shortid");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskLogSchema = new Schema(
  {
    task: [
      {
        block: {
          type: Schema.Types.ObjectId,
          ref: "block",
        },
        rooms: [
          {
            roomId: { type: Number },
            cleaningType: { type: String },
          },
        ],
        extras:[
          {
            type: {type: String},
            cleaningType : { type: String },
          }
        ],
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "location",
      required: true,
    },
    shortid: {
      type: String,
      default: shortid.generate,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
    },
    time: {
      type: Number,
    },
    total: {
      type: Number,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaskLog", taskLogSchema);
