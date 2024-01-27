import env from "../envalid";
import nodemailer from "nodemailer";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/send", (req: Request, res: Response) => {
  const sender: string = req.body.name;
  const message: string = req.body.message;
  const email: string = req.body.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL,
      pass: env.EMAIL_SECRET,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: email,
    to: env.EMAIL as string,
    subject: "You have a message from " + sender,
    text: message + "\nSent By\n" + email,
  };

  transporter.sendMail(
    mailOptions,
    function (error: Error | null, info: nodemailer.SentMessageInfo) {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );

  res.send("Mail Sent successfully");
});

export default router;
