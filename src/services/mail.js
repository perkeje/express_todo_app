const { transporter } = require("../configs/email.config");
const { generate_email_token } = require("./jwt");

module.exports.send_conf_email = async (user) => {
  let token = generate_email_token(user);
  const url = `http://localhost:3000/confirmation/${token}`;

  transporter.sendMail({
    to: user.email,
    subject: "Confirm Email",
    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
  });
};

module.exports.confirmed = async (user_id, pool) => {
  await pool.query("UPDATE USERS SET confirmed=true WHERE id=$1 RETURNING *", [
    user_id,
  ]);
};
