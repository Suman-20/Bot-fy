import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import chatBotRoutes from "./routes/chatbotroutes.js";


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


//database connection
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/chatbotApp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });


  // routes
app.use("/api/chatbot", chatBotRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
