const bcrypt = require("bcryptjs");

const User = require("../../db/schema/User");

module.exports = async function (req, res, next) {
  let { email, password } = req.body;
  let queryBody = {};
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  let result = emailRegexp.test(email);
  if (result === true) {
    queryBody.email = email;
  } else {
    queryBody.phoneNumber = parseInt(email);
  }
  User.findOne(queryBody, async (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, async (error, same) => {
        if (same) {
          user.isSignedIn = true;
          await user.save();
          return res.status(200).json({
            message: "Successful login",
            type: "success",
            shortid: user.shortid,
            role: user.role,
            email: user.email,
          });
        } else {
          return res.status(400).json({ message: "Invalid email or password" });
        }
      });
    } else {
      return res.status(400).json({
        data: { message: "Invalid email or password", type: "error" },
      });
    }
  });
};
