import express from "express";
import { handleGeneratePortfolio } from "../controllers/portfolioController.js";

const router = express.Router();

// !! -> to add middleware for protection later !!
router.post("/generate", handleGeneratePortfolio);

export default router;
