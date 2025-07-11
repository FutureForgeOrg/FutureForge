import dotenv from "dotenv";
dotenv.config()
import { renderPortfolio } from "../renderPortfolio.js";
import { deployToVercel } from "../utils/deployToVercel.js";
import path from 'path'
import DeployedPortfolio from "../models/DeployedPortfolio.js";
import Portfolio from "../models/Portfolio.js";


// export const handleGeneratePortfolio = async (req, res) => {
//     const userData = req.body;

//     // Use deployUsername from frontend, fallback to name if not present
//     const username = userData.deployUsername?.toLowerCase().replace(/\s+/g, "-") 
//         || userData.name?.toLowerCase().replace(/\s+/g, "-");

//     console.log("Username:", username);

//     if (!username || !userData) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid data"
//         });
//     }

//     const result = await renderPortfolio(userData, username);

//     if (result.success) {
//         res.json({
//             success: true,
//             message: "Portfolio generated successfully",
//             username,
//             previewUrl: `${process.env.BACKEND_URL}/previews/${username}/index.html`
//         });

//     } else {
//         res.status(500).json({
//             success: false,
//             error: result.error
//         });
//     }
// };

export const handleGeneratePortfolio = async (req, res) => {
    const userData = req.body;
    const userId = req.user._id;

    const username =
        userData.deployUsername?.toLowerCase().replace(/\s+/g, "-") ||
        userData.name?.toLowerCase().replace(/\s+/g, "-");

    const theme = userData.theme || "modern"; // default to "modern"

    if (!username || !userData) {
        return res.status(400).json({
            success: false,
            message: "Invalid data",
        });
    }

    const result = await renderPortfolio(userData, username, theme); // passing theme

    if (!result.success) {
        return res.status(500).json({
            success: false,
            error: result.error,
        });
    }

    // Save the generated portfolio to the database
    try {
        await Portfolio.create({
            userId, 
            username,
            folderPath: result.outputDir,
        });
    } catch (err) {
        console.error("Error saving portfolio to database:", err);  
        return res.status(500).json({
            success: false,
            error: "Failed to save portfolio to database",
        }); 
    }

    if (result.success) {
        res.json({
            success: true,
            message: "Portfolio generated successfully",
            username,
            previewUrl: `${process.env.BACKEND_URL}/previews/${username}/index.html`,
        });
    } else {
        res.status(500).json({
            success: false,
            error: result.error,
        });
    }
};


export const handleDeployPortfolio = async (req, res) => {
    const { username } = req.body;

    if (!username) return res.status(400).json({
        success: false,
        message: "Username required"
    });

    const correctedUsername = username?.toLowerCase().replace(/\s+/g, "-");

    if (!correctedUsername) return res.status(400).json({
        success: false,
        message: "Invalid username"
    });

    const folderPath = path.resolve(`./userPortfolios/${correctedUsername}`);

    try {
        const vercelUrl = await deployToVercel(folderPath, correctedUsername);

        // save to db 
        await DeployedPortfolio.create({
            userId: req.user._id, // assuming user is authenticated and req.user is set
            username: correctedUsername,
            folderPath,
            deployedUrl: vercelUrl,
        });


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



export const getAllPortfolios = async (req, res) => {
    const userId = req.user._id;

    //   if (!username) {
    //     return res.status(400).json({ message: "Username is required" });
    //   }

    try {
        const portfolios = await DeployedPortfolio.find({ userId }).sort({ createdAt: -1 });
        res.json({
            portfolios
        });

    } catch (error) {
        console.error("Error fetching portfolios:", error);
        res.status(500).json({ message: "Failed to fetch portfolios" });
    }
};
