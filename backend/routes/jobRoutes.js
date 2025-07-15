import express from "express";
import { getAllScrappedJobs } from "../controllers/jobController.js"
import { protectRoute } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", protectRoute ,getAllScrappedJobs);

export default router;