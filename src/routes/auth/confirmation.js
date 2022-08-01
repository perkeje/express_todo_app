var express = require("express");
var router = express.Router();
var { confirmation } = require("../../controllers/auth_controller");

router.get("/:token", confirmation);

module.exports = router;
