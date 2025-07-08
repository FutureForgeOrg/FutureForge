import express from "express";
import { handleGeneratePortfolio,handleDeployPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();

// !! -> to add middleware for protection later !!
router.post("/generate", handleGeneratePortfolio);
router.post("/deploy", handleDeployPortfolio);

export default router;
