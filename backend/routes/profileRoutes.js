import express from "express"
import {protectRoute, checkRole} from "../middleware/authmiddleware.js"
import {createOrUpdateProfile, getMyProfile} from "../controllers/profileController.js"

const router = express.Router();

router.post("/", protectRoute, createOrUpdateProfile);

router.get("/", protectRoute, getMyProfile);

export default router;