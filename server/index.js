import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { postRouter } from "./routes/posts.js";
import { userRouter } from "./routes/users.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
// middlewares
app.use(
  cors({ credentials: true, origin: "https://memoriesapi.onrender.com" })
);
app.use(bodyParser.urlencoded({ limit: `50mb`, extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
// routes
app.use("/posts", postRouter);
app.use("/users", userRouter);
if (process.env.PORT)
  mongoose
    .connect(process.env.MONG0_URL)
    .then(() => {
      // listen for requests
      app.listen(process.env.PORT);
    })
    .catch((error) => {
      console.log(error);
    });
else {
  mongoose
    .connect(process.env.MONG0_URL)
    .then(() => {
      app.listen(4000);
    })
    .catch((error) => {
      console.log(error);
    });
}
export default app;
