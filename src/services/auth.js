const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports.find_by_email = async (email, pool) => {
  try {
    let user = await pool.query("SELECT * FROM USERS WHERE EMAIL=$1", [email]);
    return user.rows[0];
  } catch (err) {
    throw Error(err);
  }
};

module.exports.create_new_user = async (email, pass, pool) => {
  const salt = await bcrypt.genSalt(10);
  const hashed_pass = await bcrypt.hash(pass, salt);
  let user = await pool.query(
    "INSERT INTO USERS(email,pass) VALUES($1,$2) RETURNING *",
    [email, hashed_pass]
  );
  user = user.rows[0];
  return new User(user.id, user.email, user.pass);
};
