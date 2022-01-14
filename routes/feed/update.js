const Feed = require("../../db/schema/Feed");
const User = require("../../db/schema/User");

module.exports = async function (req, res) {
  let { feedId, subject, description, users } = req.body;
    const feedDetails = await Feed.findOne({shortid: feedId});
    if(subject) {
        feedDetails.subject = subject;
    }
    if(description) {
        feedDetails.description = description;
    }
    if(users.length) {
        feedDetails.users = users.map(userId => {
            const user = await User.findOne({shortid: userId});
            return user._id;
        })
    }
    await feedDetails.save();
    return res.status(200).json({ message: "Feed updated successfully" });
};