require("dotenv").config();
const express = require("express");
const MailRouter = require("./routes/NodeMailer");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: `${process.env.CLIENT_HOST}`,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/mail", MailRouter);
app.get("/", (_, res) => {
  res.send("Hello World !");
});
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
