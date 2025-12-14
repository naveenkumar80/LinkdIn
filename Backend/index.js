import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

let app = express();
let port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  connectDB()
  console.log("Server is running on port 8000");
});