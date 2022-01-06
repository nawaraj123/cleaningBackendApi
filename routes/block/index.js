const express = require("express");
const router = express.Router();

const createBlockRouter = require("./create");
const updateBlockRouter = require("./update");
const deleteBlockRouter = require("./delete");
const viewAllBlockRouter = require("./viewAll");
const viewBlockRouter = require("./view");

router.post("/create", createBlockRouter);
router.post("/update", updateBlockRouter);
router.post("/delete", deleteBlockRouter);
router.get("/viewAll", viewAllBlockRouter);
router.get("/:id", viewBlockRouter);

module.exports = router;
