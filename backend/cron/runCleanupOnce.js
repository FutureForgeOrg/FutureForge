// !!! bullMQ :- for more scalability , job persistence even if the server restarts , Need tracking, retries, and scheduling.

// currently using cronjob.org with node-cron 
// so cron schedular from cronjob.org will hit out runclean up api when on prod (render)


import fs from "fs-extra";
import DeployedPortfolio from "../models/DeployedPortfolio.js";
import Portfolio from "../models/Portfolio.js";

export async function runCleanupOnce() {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h ago
  const oldPortfolios = await Portfolio.find({ createdAt: { $lt: cutoff } });

  let cleanedCount = 0;
  const failed = [];

  for (const portfolio of oldPortfolios) {
    try {
      await fs.remove(portfolio.folderPath);
      console.log(`Removed: ${portfolio.folderPath}`);
      cleanedCount++;
    } catch (err) {
      console.error(`Failed to remove ${portfolio.folderPath}:`, err);
      failed.push(portfolio._id);
    }
  }

  return {
    cleaned: cleanedCount,
    failed: failed.length,
  };
}
