import express from "express"
import {protectRoute, checkRole} from "../middleware/authmiddleware.js"
import {createOrUpdateProfile, getMyProfile, getProfileCompletionStatus} from "../controllers/profileController.js"

const router = express.Router();

router.post("/", protectRoute, createOrUpdateProfile);

router.get("/", protectRoute, getMyProfile);

router.get("/completion-status", protectRoute, getProfileCompletionStatus);

export default router;