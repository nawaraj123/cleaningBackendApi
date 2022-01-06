const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");

module.exports = async function (req, res, next) {
  let { blockId, ...updateBody } = req.body;
  let block = await Block.findOne({ shortid: blockId });
  if (block) {
    updateBody.location = await Location.findOne({shortid: location}).then(data => data._id);
    await Block.updateOne(
      { shortid: blockId },
      { $set: updateBody },
      function (error, response) {
        if (error) throw error;
      }
    );
    return res.status(200).json({
      message: "Block updated successfully",
    });
  } else {
    return res.status(200).json({ message: "No block found with such id" });
  }
};
