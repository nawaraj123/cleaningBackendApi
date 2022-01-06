const Block = require("../../db/schema/Block");

module.exports = async function (req, res, next) {
  let dbQuery = {};
  let blocks = await Block.find(dbQuery);
  let blockDetails = await Promise.all(
    blocks.map((block) => {
      return {
        name: block.name,
        rooms: block.rooms,
        extras: block.extras,
        shortid: block.shortid,
      };
    })
  );
  return res.status(200).json({ blockDetails: blockDetails });
};
