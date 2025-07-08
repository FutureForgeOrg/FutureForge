import mongoose from "mongoose";

const deployedPortfolioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  folderPath: { type: String, required: true },
  deployedUrl: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now, // No TTL — just for cleanup reference
  },
});

export default mongoose.model("DeployedPortfolio", deployedPortfolioSchema);
