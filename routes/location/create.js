const Location = require("../../db/schema/Location");

module.exports = async function (req, res, next) {
  let { name, rate } = req.body;
  if (!name ) {
    return res.status(400).json({ message: "Require name" });
  } else {
    let newLocation = new Location({ ...req.body });
    await newLocation.save();
    return res.status(200).json({ message: "Location created successfully" });
  }
};
