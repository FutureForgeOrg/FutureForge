import BaseUser from "../models/BaseUser.js";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {
    const { username, email, password, gender, role } = req.body;

    if (!username || !email || !password || gender === undefined || !role) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if( role !== "admin" && role !== "user") {
        return res.status(400).json({
            message: "Invalid role"
        });
    }

    try{
        const existingUser = await BaseUser.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new BaseUser({
            username,
            email,
            password: hashedPassword,
            gender,
            role,
            ipAddress: req.ip || req.headers["x-forwarded-for"] || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
        });

        await newUser.save();
        return res.status(201).json({
            message: "Admin created successfully",
            user: { ...newUser.toObject(), password: undefined }
        });
    } 

    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}