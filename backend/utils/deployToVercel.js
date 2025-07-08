import path from "path";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

export async function deployToVercel(folderPath, username) {
    const token = process.env.VERCEL_TOKEN;
    const projectName = `${process.env.VERCEL_PROJECT_NAME}-${username}`;
    // const teamId = process.env.VERCEL_TEAM_ID || undefined;

    if (!token || !projectName) {
        throw new Error("Missing Vercel config in .env");
    }

    // Step 1: Prepare all files
    const files = await collectFiles(folderPath);

    // Step 2: Construct deployment body
    const payload = {
        name: projectName,
        files,
        builds: [
            {
                src: "index.html",
                use: "@vercel/static",
            },
        ],
        // static: [{ src: "/", dest: "/" }],
    };

    // Step 3: Send to Vercel API
    const res = await fetch("https://api.vercel.com/v13/deployments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error?.message || "Vercel deploy failed");
    }

    return `https://${data.alias[0]}`;
}

// Helper to collect files recursively
async function collectFiles(dir) {
    const files = [];

    const walk = async (currentPath) => {
        const entries = fs.readdirSync(currentPath);
        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                await walk(fullPath);
            } else {
                const relativePath = path.relative(dir, fullPath).replace(/\\/g, "/");
                const content = fs.readFileSync(fullPath);
                files.push({ file: relativePath, data: content.toString("base64"), encoding: "base64" });
            }
        }
    };

    await walk(dir);
    return files;
}
