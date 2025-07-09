import express from "express";
import { handleGeneratePortfolio,handleDeployPortfolio, getAllPortfolios } from "../controllers/portfolioController.js";
import { protectRoute } from "../middleware/authmiddleware.js";

const router = express.Router();

// !! -> to add middleware for protection later !!
router.get('/all',protectRoute, getAllPortfolios);

router.post("/generate", protectRoute, handleGeneratePortfolio);
router.post("/deploy",protectRoute, handleDeployPortfolio);

export default router;
