import express from "express";

import { protectRoute, checkRole } from "../middleware/authmiddleware.js";

import { createAdmin, getDashboardData, adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-admin", protectRoute, checkRole("admin"), createAdmin);
router.post("/login", adminLogin)
router.get("/stats", protectRoute, checkRole("admin"), getDashboardData);

export default router;