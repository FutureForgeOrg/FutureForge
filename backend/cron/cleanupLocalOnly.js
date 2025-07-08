import cron from "node-cron";
import { runCleanupOnce } from "./runCleanupOnce.js";

export function startLocalCleanupJob() {
  cron.schedule("0 * * * *", async () => {
    console.log("Local cleanup job triggered...");
    await runCleanupOnce();
  });
}


// !! just for testing -> to check if logic works

import cron from "node-cron";
import { runCleanupOnce } from "./runCleanupOnce.js";

export function startLocalCleanupJob() {
  // TEMPORARY: run every minute for testing
  cron.schedule("* * * * *", async () => {
    console.log("Local cleanup job triggered...");
    const result = await runCleanupOnce();
    console.log("Cleanup result:", result);
  });
}
