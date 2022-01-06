const User = require("../../db/schema/User");

module.exports = async function (req, res, next) {
  let { firstName, surname, role, dob, email, password } = req.body;
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Require email, password and role" });
  } else {
    let userDetails = await User.findOne({email:email});
    if(userDetails){
      return res.status(400).json({ message: "Email already exists" });
    }
    req.body.isSignedIn = true;
    let user = new User(req.body);
    await user.save();
    return res.status(200).json({ message: "User created sucessfully" });
  }
};
