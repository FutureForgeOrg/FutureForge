dotenv.config()
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import BaseUser from "./models/BaseUser.js"; 

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(express.json());

// connect to db
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((err) => {
        console.log("error connecting to mongoDB",err)
    })

// routes
app.get("/", (req, res) => {
  res.send("api is up and running !");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
