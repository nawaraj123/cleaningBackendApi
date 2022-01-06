const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");
const TaskLog = require("../../db/schema/TaskLog");

module.exports = async function (req, res, next) {
  let { taskLogId, ...postBody } = req.body;
  let taskLog = await Tasklog.findOne({ shortid: taskLogId });
  if (taskLog) {
    if (postBody.endAt) {
      tasklog.endAt = postBody.endAt;
      taskLog.time = parseInt(
        (postBody.endAt - taskLog.startAt) / (1000 * 60),
        10
      );
      taskLog.total = 100;
    }
    if (postBody.tasks) {
      let tasksArr = await Promise.all(
        postBody.tasks.map(async (task) => {
          let block = await Block.findOne({ shortid: task.block });
          return {
            block: block._id,
            rooms: task.rooms,
            extras: task.extras
          };
        })
      );
      taskLog.task = tasksArr;
    }
    if (postBody.reason) {
      taskLog.reason = postBody.reason;
    }

    await taskLog.save();

    return res.status(200).json({
      message: "TaskLog updated successfully",
    });
  } else {
    return res.status(200).json({ message: "No taskLog found with such id" });
  }
};
