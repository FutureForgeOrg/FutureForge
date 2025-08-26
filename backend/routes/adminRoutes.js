import express from "express";

import { protectRoute, checkRole } from "../middleware/authmiddleware.js";

import {
    createAdmin, getDashboardData, adminLogin,
    getAllUsers, banUser, unBanUser, getJobById,
    updateJobById, deleteJobById
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-admin", protectRoute, checkRole("admin"), createAdmin);
router.post("/login", adminLogin)
router.get("/stats", protectRoute, checkRole("admin"), getDashboardData);

router.get("/all-users", protectRoute, checkRole("admin"), getAllUsers);
router.delete("/ban-user/:id", protectRoute, checkRole("admin"), banUser)
router.put("/unban-user/:id", protectRoute, checkRole("admin"), unBanUser)

router.get("/jobs/:jobId", protectRoute, checkRole("admin"), getJobById);
router.put("/jobs/:jobId", protectRoute, checkRole("admin"), updateJobById);
router.delete("/jobs/:jobId", protectRoute, checkRole("admin"), deleteJobById);
//router.post("/new-job", protectRoute, checkRole("admin"), createJob);

// router.get("/all-jobs", protectRoute, checkRole("admin"), getAllJobs); this will be same as user jobs
// router.get("/all-portfolios", protectRoute, checkRole("admin"), getAllPortfolios);
// router.post("/logout", protectRoute, checkRole("admin"), logoutAdmin);

// router.put("/delete-user/:id", protectRoute, checkRole("admin"), deleteUser);
// router.put("/delete-job/:id", protectRoute, checkRole("admin"), deleteJob);
// router.put("/delete-portfolio/:id", protectRoute, checkRole("admin"), deletePortfolio);
// router.put("/update-user/:id", protectRoute, checkRole("admin"), updateUser);
// router.put("/update-job/:id", protectRoute, checkRole("admin"), updateJob);

export default router;