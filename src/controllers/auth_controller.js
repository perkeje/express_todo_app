const pool = require("../services/pool");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const generate_access_token = require("../services/jwt");
const { create_new_user, find_by_email } = require("../services/auth");

module.exports.register_user = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const found = await find_by_email(req.body.email, pool);
    if (found !== undefined)
      return res.status(400).json({ error: "User already exists" });
    let user = await create_new_user(req.body.email, req.body.pass, pool);
    return res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.stack });
  }
};

module.exports.login_user = async (req, res) => {
  try {
    const user_res = await find_by_email(req.body.email, pool);
    if (user_res === undefined)
      return res.status(400).json({ error: "User does not exists" });
    const user = new User(user_res.id, user_res.email, user_res.pass);
    const validPassword = await bcrypt.compare(req.body.pass, user.pass);
    if (validPassword) {
      const token = generate_access_token(user);
      return res.status(200).set("jwt", token).json({ message: "logged in" });
    } else {
      return res.status(400).json({ error: "Invalid password" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal error" });
  }
};
