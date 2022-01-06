const Location = require("../../db/schema/Location");

module.exports = async function (req, res, next) {
  let { locationId, ...updateBody } = req.body;
  let location = await Location.findOne({ shortid: locationId });
  if (location) {
    await Location.updateOne(
      { shortid: locationId },
      { $set: updateBody },
      function (error, response) {
        if (error) throw error;
      }
    );
    return res.status(200).json({
      message: "Location updated successfully",
    });
  } else {
    return res.status(400).json({ message: "No location found with such id" });
  }
};
