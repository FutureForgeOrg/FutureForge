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
        maxlength: [32, "Password cannot exceed 32 characters"],
    },
    role: {
        type: String,
        enum: ["baseuser", "admin"],
        default: "BaseUser",
    },
    gender: {
        type : String,
        enum : ["male","female","other"],
        default : "male",
        required : true
    }
}, {
    timestamps: true
});

const BaseUser = mongoose.model("BaseUser", baseUserSchema);

export default BaseUser;