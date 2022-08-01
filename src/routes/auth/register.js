var express = require("express");
var router = express.Router();
var { register_user } = require("../../controllers/auth_controller");
const { body } = require("express-validator");

router.post(
  "/",
  body("email").isEmail(),
  body("pass").isLength({ min: 3 }),
  register_user
);

module.exports = router;
