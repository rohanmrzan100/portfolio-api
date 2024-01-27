import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";
dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port(),
  EMAIL_SECRET: str(),
  EMAIL: str(),
  CLIENT_HOST: str(),
  NODE_ENV: str(),
});

export default env;
