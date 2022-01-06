const express = require("express");
const router = express.Router();

const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");
const TaskLog = require("../../db/schema/TaskLog");
const User = require("../../db/schema/User");

const { parse } = require("json2csv");

router.get("/get", async function (req, res, next) {
  try {
    let startTime = new Date(req.query.startTime);
    let endTime = new Date(req.query.endTime);
    const date = new Date();
    let taskLogsDetails = [];
    let taskLogsArr = await TaskLog.find({
      startAt: { $gte: startTime , $lte: endTime },
    });
    if (taskLogsArr.length) {
      taskLogsDetails = await Promise.all(
        taskLogsArr.map(async (taskLog) => {
          let userDetails = await User.findOne({ _id: taskLog.user });
          let locationDetails = await Location.findOne({
            _id: taskLog.location,
          });
          let blocksDetails = [];
          let rooms = [];
          let extras = [];
          await Promise.all(
            taskLog.task.map(async (task) => {
              let blockDetail = await Block.findOne({ _id: task.block });
              blocksDetails.push(blockDetail.name);
              rooms = [...rooms, ...task.rooms.map(room =>{return {room:room.roomId, cleaningType:room.cleaningType}})];
              extras = [...extras, ...task.extras.map(extra =>{return {type:extra.type, cleaningType:extra.cleaningType}})];
              return true;
            })
          );
          let item = {
            UserID: userDetails.shortid,
            Email: userDetails.email,
            Location: locationDetails.name,
            Block: blocksDetails,
            Rooms: rooms,
            Extras: extras,
            Start: date.toLocaleString(taskLog.startAt),
            End: taskLog.endAt? date.toLocaleString(taskLog.endAt): "N/A",
            Hours: taskLog.time ? taskLog.time:"N/A",
            Total: taskLog.total ? taskLog.toal:"N/A",
            Reason: taskLog.reason ? taskLog.reason : "",
          };
          return item;
        })
      );
    }
    const fields = [
      "UserID",
      "Email",
      "Location",
      "Block",
      "Rooms",
      "Extras",
      "Start",
      "End",
      "Hours",
      "Total",
      "Reason",
    ];
    let data = taskLogsDetails;
    const opts = { fields };
    const csv = await parse(data, opts);
    await res.attachment(`data.csv`);
    await res.status(200).send(csv);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
