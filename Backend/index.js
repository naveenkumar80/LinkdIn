import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

let app = express();
let port = process.env.PORT || 3000;




app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  connectDB()
  console.log("Server is running on port 3000");
});