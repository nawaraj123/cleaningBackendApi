const Feed = require("../../db/schema/Feed");
const User = require("../../db/schema/User");

module.exports = async function (req, res) {
  let { userId } = req.query;
  let dbQuery = {};
  if(userId){
      const user = await User.findOne({shortid: userId});
       dbQuery.users = user._id;
  }
    const feedDetails = await Feed.find(dbQuery).sort({createdAt: -1});
    return res.status(200).json({ feed: feedDetails });
};