const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");


module.exports = async function (req, res, next) {
  let { locationId } = req.body;
  let location = await Location.findOne({ shortid: locationId });
  if (location) {
    const blocks = await Block.find({location: location._id});
    blocks.map(async block => await block.remove());
    await location.remove();
    return res.status(200).json({
      message: "Location deleted successfully",
    });
  } else {
    return res.status(200).json({ message: "No location found with such id" });
  }
};
