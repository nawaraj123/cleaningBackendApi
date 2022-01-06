const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");

module.exports = async function (req, res, next) {
  let { id } = req.params;
  let location = await Location.findOne({ shortid: id });
  if (location) {
    return res.status(200).json({
      location: {
        name: location.name,
        shortid: location.shortid,
        address: location.address,
        blocks: await Block.find({ location: location._id })
          .then(data =>{ return data.map(doc => {
            return {
              name: doc.name,
              shortid: doc.shortid,
              rooms: doc.rooms,
              extras: doc.extras
            }
          }
        )}),
      },
    });
  } else {
    return res.status(200).json({ message: "No location found with such id" });
  }
};
