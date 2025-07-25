import mongoose from "mongoose";

const emailVerificationTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BaseUser",
        unique: true,           //bug: wihout this, multiple tokens can be created for the same user
        required: true
    },
    token: {
        type: String,
        required: true
    },
    resendCooldownUntil: {
        type: Date,
        default: () => new Date(Date.now() + 60 * 1000), // 1 min cooldown
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900            // 15 min TTL
    }, 
});

export default mongoose.model("EmailVerificationToken", emailVerificationTokenSchema);
