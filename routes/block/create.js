const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");

module.exports = async function (req, res, next) {
  try {
    let { name, rooms, extras, location } = req.body;
    if (!name || !rooms.length || !location) {
      return res.status(400).json({ message: "Require name location, and rooms list" });
    } else {
      let locationDetails = await Location.findOne({shortid: location});
      let blockDetail = await Block.findOne({location: locationDetails._id, name:name});
      if(blockDetail){
        return res.status(400).json({ message: "Block with similar name already exists"});
      }
      let newBlock = new Block({
        name:name,
        rooms:rooms,
        extras: extras,
        location: locationDetails._id
      });
      await newBlock.save();
      return res.status(200).json({ message: "Block created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: error,
    });
  }
};
