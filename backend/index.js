import dotenv from "dotenv";
dotenv.config()
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import cleanupRoutes from "./routes/cleanupRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many requests, please try again later.",
});

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

app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/cleanup", cleanupRoutes);


// to serve previews :-
// Now any file saved under userPortfolios/param-bhavsar/index.html becomes visible at: http://localhost:8080/previews/param-bhavsar/index.html

app.use("/previews", express.static(path.join(__dirname, "userPortfolios")));

// enable only in local dev
if (process.env.NODE_ENV !== "production") {
  import("./cron/cleanupLocalOnly.js").then(mod => mod.startLocalCleanupJob());
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
