const Feed = require("../../db/schema/Feed");

module.exports = async function (req, res) {
    let { feedId } = req.body;
    const feedDetails = await Feed.findOne({shortid: feedId});
    await feedDetails.remove();
    return res.status(200).json({ message: "Feed deleted successfully" });
};