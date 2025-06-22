import mongoose, { mongo } from "mongoose";

const baseUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name can't exceed 50 characters"],
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
        type : String,
        enum : ["male","female","other"],
        default : "male",
        required : true
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

const BaseUser = mongoose.model("BaseUser", baseUserSchema);

export default BaseUser;