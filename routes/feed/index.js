const express = require("express");
const router = express.Router();

const createFeedRouter = require("./create");
const updateFeedRouter = require("./update");
const viewAllFeedRouter = require("./viewAll");
const deleteFeedRouter = require("./delete");

router.Feed("/create", createFeedRouter);
router.Feed("/update", updateFeedRouter);
router.get("/viewAll", viewAllFeedRouter);
router.get("/delete", deleteFeedRouter);

module.exports = router;