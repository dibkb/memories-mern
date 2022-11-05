import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { postRouter } from "./routes/posts.js";
dotenv.config();
const mongoString = process.env.MONG0_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: `30mb`, extended: true }));
app.use(bodyParser.urlencoded({ limit: `30mb`, extended: true }));
app.use(express.json());
// post routes
app.use("/posts", postRouter);
app.listen(4000, () => {
  console.log(`server running on PORT 4000`);
});
