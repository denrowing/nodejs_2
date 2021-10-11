const router1 = require('express').Router();

const userController = require("../controllers/user.controller");

router1.get('/', userController.compareUser);

module.exports = router1;
