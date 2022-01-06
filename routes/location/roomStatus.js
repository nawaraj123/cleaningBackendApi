const Block = require("../../db/schema/Block");
const Location = require("../../db/schema/Location");
const TaskLog = require("../../db/schema/TaskLog");
const User = require("../../db/schema/User");

module.exports = async function (req, res, next) {
  try {
    let locationId = req.params.id;
    let location = await Location.findOne({ shortid: locationId });
    let blockList = await Block.find({ location: location._id });
    let blockDetails = [];
    let taskLogsArr = await TaskLog.find({
      location: { $exists: true },
      createdAt: {
        $gt: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(24, 0, 0, 0),
      },
    });

    if (taskLogsArr.length) {
      let roomStatus = [];
      await Promise.all(
        taskLogsArr.map(async (taskLog) => {
          await Promise.all(
            taskLog.task.map(async (block) => {
              let blockDetails = await Block.findOne({
                _id: block.block,
              });
              let roomsUpdate = blockDetails.rooms.map((room) => {
                let result = block.rooms.filter((item) => item.roomId === room);
                return result.length ? result[0] : room;
              });
              let extrasUpdate = [];
              if(blockDetails.extras && blockDetails.extras.length){
                extrasUpdate = blockDetails.extras.map((type) => {
                  let result =[];
                  if(block.extras && block.extras.length){
                      result = block.extras.filter((item) => item.type === type);
                    }
                  return result.length ? result[0] : type;
                });
              }
              let blockItem = {
                name: blockDetails.name,
                shortid: blockDetails.shortid,
                roomStatus: roomsUpdate,
                extrasStatus: extrasUpdate,
              };
              roomStatus.push(blockItem);
            })
          );
        })
      );
      blockDetails = blockList.map((block) => {
        blockRoomsStatus = roomStatus.filter(
          (x) => x.shortid === block.shortid
        );
        let getRoomsUpdateArr = [];
        let getExtrasUpdateArr = [];
        if (blockRoomsStatus.length) {
          blockRoomsStatus.map((data) => {
            getRoomsUpdateArr.push(...data.roomStatus);
            getExtrasUpdateArr.push(...data.extrasStatus);
          });
        }
        let roomsUpdateArr = block.rooms.map((room) => {
          let roomCleaningStatus = getRoomsUpdateArr.filter(
            (x) => x === room || x.roomId === room
          );
          if (roomCleaningStatus.length) {
            let fullCleaning = roomCleaningStatus.filter(
              (x) => x.cleaningType === "daily"
            );
            if (fullCleaning.length) {
              return fullCleaning[0];
            } else {
              let partialCleaning = roomCleaningStatus.filter(
                (x) => x.cleaningType === "thorough"
              );
              if (partialCleaning.length) {
                return partialCleaning[0];
              } else {
                return {roomId:room};
              }
            }
          }
        });
        console.log(roomsUpdateArr)
        let extrasUpdateArr = block.extras.length ? block.extras.map((type) => {
          let extrasCleaningStatus = getExtrasUpdateArr.filter(
            (x) => x === type || x.type === type
          );
          if(extrasCleaningStatus.length) {
            let fullCleaning = extrasCleaningStatus.filter(
              (x) => x.cleaningType === "daily"
            );
            if(fullCleaning.legth){
                return fullCleaning[0];
            } else {
              let partialCleaning = extrasCleaningStatus.filter(
                (x) => x.cleaningType === "thorough"
              );
              if (partialCleaning.length) {
                return partialCleaning[0];
              } else {
                return {type:type};
              }
            }
          }
        }):[];
        return {
          name: block.name,
          shortid: block.shortid,
          rooms: blockRoomsStatus.length ? roomsUpdateArr : block.rooms.map(room => {return {roomId:room}}),
          extras: blockRoomsStatus.length ? extrasUpdateArr : block.extras.map(extraType => {return {type:extraType}}),
        };
      });
    } else {
      blockDetails = blockList.map((block) => {
        return {
          name: block.name,
          shortid: block.shortid,
          rooms: block.rooms.map(room => {return {roomId:room}}),
          extras: block.extras.map(extraType => {return {type:extraType}}),
        };
      });
    }
    return res.status(200).json({
      data: {
        name: location.name,
        address: location.address,
        rate: location.rate,
        shortid: location.shortid,
        blocks: blockDetails,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: error,
    });
  }
};
