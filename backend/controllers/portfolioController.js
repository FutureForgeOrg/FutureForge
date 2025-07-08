import dotenv from "dotenv";
dotenv.config()
import { renderPortfolio } from "../renderPortfolio.js";

export const handleGeneratePortfolio = async (req, res) => {
    const userData = req.body;
    const username = userData.name?.toLowerCase().replace(/\s+/g, "-");

    if (!username || !userData) {
        return res.status(400).json({ success: false, message: "Invalid data" });
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
        res.status(500).json({ success: false, error: result.error });
    }
};

