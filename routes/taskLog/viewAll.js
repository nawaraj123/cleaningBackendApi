const Block = require("../../db/schema/Block");
const TaskLog = require("../../db/schema/TaskLog");
const Location = require("../../db/schema/Location");
const User = require("../../db/schema/User");

module.exports = async function (req, res, next) {
  let startTime = new Date(req.query.startTime);
  let endTime = new Date(req.query.endTime);
  let dbQuery = {
    startAt: { $gte: startTime , $lte: endTime }
  };
  let taskLogs = await TaskLog.find(dbQuery);
  let taskLogDetails = await Promise.all(
    taskLogs.map(async (taskLog) => {
      let taskDetails = await Promise.all(
        taskLog.task.map(async (task) => {
          let blockDetails = await Block.findOne({ _id: task.block });
          return {
            block: {
              name: blockDetails.name,
              shortid: blockDetails.shortId,
              rooms: task.rooms,
              extras: task.extras ? task.extras:[]
            },
          };
        })
      );
      return {
        task: taskDetails,
        user: await User.findOne({ _id: taskLog.user }).then((data) => {
          return {
            name: data.name,
            shortid: data.shortid,
          };
        }),
        location: await Location.findOne({ _id: taskLog.location }).then(
          (data) => {
            return {
              name: data.name,
              shortid: data.shortid,
            };
          }
        ),
        shortid: taskLog.shortid,
        startAt: taskLog.startAt,
        endAt: taskLog.endAt ? taskLog.endAt : "",
        time: taskLog.time ? taskLog.time : 0,
        total: taskLog.total ? taskLog.total : 0,
        reason: taskLog.reason ? taskLog.reason : "",
      };
    })
  );
  return res.status(200).json({ taskLogDetails: taskLogDetails });
};
