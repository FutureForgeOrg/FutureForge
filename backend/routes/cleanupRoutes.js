import express from "express";
import { runCleanupOnce } from "../cron/runCleanupOnce.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await runCleanupOnce();
        res.json({
            success: true, 
            ...result 
        });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

export default router;
