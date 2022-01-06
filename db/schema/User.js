const shortid = require("shortid");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    surname: {
      type: String,
    },
    shortid: {
      type: String,
      default: shortid.generate,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "user"],
    },
    dob: {
      type: Date,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email."],
    },
    password: {
      type: String,
      required: [true, "Please provide your password."],
    },
    isSignedIn: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, encrypt) {
      user.password = encrypt;
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
