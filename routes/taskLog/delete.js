const TaskLog = require("../../db/schema/TaskLog");

module.exports = async function (req, res, next) {
  let { taskLogId } = req.body;
  let taskLog = await TaskLog.findOne({ shortid: taskLogId });
  if (taskLog) {
    await taskLog.remove();
    return res.status(200).json({
      message: "TaskLog deleted successfully",
    });
  } else {
    return res.status(200).json({ message: "No taskLog found with such id" });
  }
};
