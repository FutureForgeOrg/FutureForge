import express from "express";

import { protectRoute, checkRole } from "../middleware/authmiddleware.js";

import { createAdmin, getDashboardData } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-admin", protectRoute, checkRole("admin"), createAdmin);
router.get("/stats", protectRoute, checkRole("admin"), getDashboardData);

export default router;