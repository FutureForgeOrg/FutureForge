import dotenv from "dotenv";
dotenv.config()
import { renderPortfolio } from "../renderPortfolio.js";
import { deployToVercel } from "../utils/deployToVercel.js";
import path from 'path'
import DeployedPortfolio from "../models/DeployedPortfolio.js";


export const handleGeneratePortfolio = async (req, res) => {
    const userData = req.body;
    const username = userData.name?.toLowerCase().replace(/\s+/g, "-");

    if (!username || !userData) {
        return res.status(400).json({
            success: false,
            message: "Invalid data"
        });
    }

    const result = await renderPortfolio(userData, username);

    if (result.success) {
        res.json({
            success: true,
            message: "Portfolio generated successfully",
            username,
            previewUrl: `${process.env.BACKEND_URL}/previews/${username}/index.html`
        });

    } else {
        res.status(500).json({
            success: false,
            error: result.error
        });
    }
};



export const handleDeployPortfolio = async (req, res) => {
    const { username } = req.body;

    if (!username) return res.status(400).json({
        success: false,
        message: "Username required"
    });

    const folderPath = path.resolve(`./userPortfolios/${username}`);

    try {
        const vercelUrl = await deployToVercel(folderPath, username);

        // save to db 
        await DeployedPortfolio.create({
            username,
            folderPath,
            deployedUrl: vercelUrl,
        });

        // Schedule cleanup after 24h
        setTimeout(() => {
            fs.rm(folderPath, { recursive: true, force: true }, (err) => {
                if (err) console.error("Cleanup failed:", err);
                else console.log(`Cleaned up ${folderPath}`);
            });
        }, 24 * 60 * 60 * 1000); // 24 hours

        res.json({
            success: true,
            deployedUrl: vercelUrl
        });

    } catch (err) {
        console.error("Deploy failed:", err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
