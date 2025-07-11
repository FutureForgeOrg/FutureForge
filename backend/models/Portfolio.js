import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  userId : { type: mongoose.Schema.Types.ObjectId, ref: "BaseUser", required: true },
  username: { type: String, required: true },
  folderPath: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now, // for cleanup reference
  },
});

export default mongoose.model("Portfolio", PortfolioSchema);
