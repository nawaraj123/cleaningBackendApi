const express = require("express");
const router = express.Router();

const createTaskLogRouter = require("./create");
const updateTaskLogRouter = require("./update");
const deleteTaskLogRouter = require("./delete");
const viewAllTaskLogRouter = require("./viewAll");
const viewTaskLogRouter = require("./view");

router.post("/create", createTaskLogRouter);
router.post("/update", updateTaskLogRouter);
router.post("/delete", deleteTaskLogRouter);
router.get("/viewAll", viewAllTaskLogRouter);
router.get("/:id", viewTaskLogRouter);

module.exports = router;
