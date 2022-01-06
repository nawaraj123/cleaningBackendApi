const Block = require("../../db/schema/Block");

module.exports = async function (req, res, next) {
  let { blockId } = req.body;
  let block = await Block.findOne({ shortid: blockId });
  if (block) {
    await block.remove();
    return res.status(200).json({
      message: "Block deleted successfully",
    });
  } else {
    return res.status(200).json({ message: "No block found with such id" });
  }
};
