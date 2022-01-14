const Feed = require("../../db/schema/Feed");
const User = require("../../db/schema/User");

const sendFeedCreatedNotification = require('../../services/notification/notificationMap/createFeed');

module.exports = async function (req, res) {
  let { subject, description, users } = req.body;
  if (!subject || !description) {
    return res.status(400).json({ message: "Requires subject and description" });
  }
  let usersIdArr= [];
  if(users.length){
    usersIdArr = users.map(userId => {
        const user = await User.findOne({shortid: userId});
        return user._id;
    })
  }
let newFeed = new Feed({ ...req.body, users:usersIdArr });
await newFeed.save();
sendFeedCreatedNotification({subject, description, usersIdArr});
return res.status(200).json({ message: "New feed created successfully" });
};