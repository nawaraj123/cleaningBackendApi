const express = require("express");
const router = express.Router();

const roomStatusRouter = require("./roomStatus");
const createLocationRouter = require("./create");
const updateLocationRouter = require("./update");
const viewAllLocationRouter = require("./viewAll");
const viewLocationRouter = require("./view");

router.post("/create", createLocationRouter);
router.post("/update", updateLocationRouter);
router.get("/viewAll", viewAllLocationRouter);
router.get("/:id", viewLocationRouter);
router.get("/:id/roomStatus", roomStatusRouter);

module.exports = router;
