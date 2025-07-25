import mongoose, { mongo } from "mongoose";

const baseUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name can't exceed 50 characters"],
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: [4, "Password must be at least 4 characters long"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male",
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    expiresAt: {            // used only if isVerified = false
        type: Date,
        default: null
    },                  
    ipAddress: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});

// TTL index: Automatically delete users at `expiresAt`
baseUserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const BaseUser = mongoose.model("BaseUser", baseUserSchema);

export default BaseUser;