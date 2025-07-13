import express from "express";

import { protectRoute,checkRole } from "../middleware/authmiddleware.js";

import { createAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-admin", protectRoute, checkRole("admin"), createAdmin);

export default router;