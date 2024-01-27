import env from "./envalid";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import MailRouter from "./routes/NodeMailer";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port: number = env.PORT || 5000;

let CLIENT_HOST: string = "http://localhost:3000";
if (env.NODE_ENV === "production") {
  CLIENT_HOST = env.CLIENT_HOST;
}

app.use(
  cors({
    origin: `${env.CLIENT_HOST}`,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/mail", MailRouter);

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
});

app.listen(port, () => {
  console.log(`APP is running on port ${port}`);
});
