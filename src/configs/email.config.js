const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
module.exports.transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: false,
  logger: true,
});
