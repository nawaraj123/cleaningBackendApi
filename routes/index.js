var express = require("express");
var router = express.Router();

const signUpController = require("./signup");
const loginController = require("./login");

const getUsersInfoController = require("./user/usersInfo");

router.post("/signup", signUpController);

router.post("/login", loginController);

router.get("/getUsersInfo", getUsersInfoController);

module.exports = router;
