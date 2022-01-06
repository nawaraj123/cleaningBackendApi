const User = require("../../db/schema/User");
const moment = require("moment");

module.exports = async function (req, res, next) {
  let userId = req.query.id;
  let user = await User.findOne({ shortid: userId });
  if (user) {
    const userDetails = {
      firstName: user.firstName ? user.firstName : "",
      surname: user.surname ? user.surname : "",
      fullName: user.firstName + " " + user.surname,
      shortid: user.shortid,
      role: user.role,
      dob: user.dob ? moment(user.dob).format(" DD MMM YYYY") : "",
      email: user.email,
    };
    let dbQuery = {};
    if (user.role === "admin") {
      dbQuery.role = ["editor", "user"];
    } else if (user.role === "editor") {
      dbQuery.role = ["user"];
    } else {
      return res.status(200).json({
        userInfo: userDetails,
      });
    }
    let users = await User.find(dbQuery);
    let usersInfoColl = await Promise.all(
      users.map((user) => {
        return {
          firstName: user.firstName ? user.firstName : "",
          surname: user.surname ? user.surname : "",
          fullName: user.firstName + " " + user.surname,
          shortid: user.shortid,
          role: user.role,
          dob: user.dob ? moment(user.dob).format(" DD MMM YYYY") : "",
          email: user.email,
        };
      })
    );
    return res.status(200).json({
      otherUsersColl: usersInfoColl,
      userInfo: userDetails,
    });
  } else {
    return res.status(400).json({
      data: {
        message: "No user found related to this account",
      },
    });
  }
};
