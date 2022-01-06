const Block = require("../../db/schema/Block");

module.exports = async function (req, res, next) {
  let { id } = req.params;
  let block = await Block.findOne({ shortid: id });
  if (block) {
    return res.status(200).json({
      block: {
        name: block.name,
        rooms: block.rooms,
        extras: block.extras,
        shortid: block.shortid,
      },
    });
  } else {
    return res.status(200).json({ message: "No block found with such id" });
  }
};
