import bcrypt from "bcrypt";
import BaseUser from "../models/BaseUser.js";
import { generateToken } from "./jwtToken.js";

export const createInitialAdmin = async (res) => {
  const existingAdmin = await BaseUser.findOne({ role: "admin" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new BaseUser({
      username: process.env.ADMIN_USERNAME || "admin",
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: hashedPassword,
      gender: "other",
      role: "admin",
      isVerified: true,
      expiresAt: null, // No expiration for admin
      ipAddress: "127.0.0.1",
      userAgent: "Windows",
    });
    
    await adminUser.save();

    generateToken(adminUser._id, adminUser.email, res)
    
    console.log("Initial admin created successfully.");
  } else {
    console.log("Initial admin already exists.");
  }
};
