const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");
const TaskLog = require("../../db/schema/TaskLog");
const User = require("../../db/schema/User");

module.exports = async function (req, res, next) {
  let { user, tasks, location, startAt } = req.body;
  if (!user || !tasks.length || !location || !startAt) {
    return res
      .status(400)
      .json({ message: "Require user, tasks list, location and start time" });
  } else {
    let tasksArr = await Promise.all(
      tasks.map(async (task) => {
        let block = await Block.findOne({ shortid: task.block });
        return {
          block: block._id,
          rooms: task.rooms,
          extras: task.extras,
        };
      })
    );
    let createBody = {
      task: tasksArr,
      user: await User.findOne({ shortid: user }).then((data) => data._id),
      location: await Location.findOne({ shortid: location }).then(
        (data) => data._id
      ),
      startAt: startAt,
    };
    let newTaskLog = new TaskLog(createBody);
    await newTaskLog.save();
    return res.status(200).json({ message: "Tasklog created successfully" });
  }
};
