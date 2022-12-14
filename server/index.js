import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { postRouter } from "./routes/posts.js";
import { userRouter } from "./routes/users.js";
dotenv.config();
const app = express();
// middlewares
app.use(cors());
app.use(bodyParser.json({ limit: `30mb`, extended: true }));
app.use(bodyParser.urlencoded({ limit: `30mb`, extended: true }));
app.use(express.json());
// routes
app.use("/posts", postRouter);
app.use("/users", userRouter);
mongoose
  .connect(process.env.MONG0_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
