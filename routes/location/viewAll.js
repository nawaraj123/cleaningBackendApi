const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");

module.exports = async function (req, res, next) {
  let locations = await Location.find({});
  let locationDetails = await Promise.all(
    locations.map(async (location) => {
      return {
        name: location.name,
        shortid: location.shortid,
        address: location.address,
        noOfBlocks: await Block.countDocuments({location: location._id}),
      };
    })
  );
  return res.status(200).json({ locations: locationDetails });
};
