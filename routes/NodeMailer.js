const nodemailer = require("nodemailer");
const express = require("express");

const router = express.Router();

router.post("/send", (req, res) => {
  const sender = req.body.name;
  const message = req.body.message;
  const email = req.body.email;
//   console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_SECRET,
    },
  });
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: "You have a message from " + sender,
    text: message + "\nSent By\n" + email,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send("Mail Sent sucessfully");
});

module.exports = router;
