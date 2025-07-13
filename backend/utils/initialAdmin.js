import bcrypt from "bcrypt";
import BaseUser from "../models/BaseUser.js";

export const createInitialAdmin = async () => {
  const existingAdmin = await BaseUser.findOne({ role: "admin" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new BaseUser({
      username: process.env.ADMIN_USERNAME || "admin",
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: hashedPassword,
      gender: "other",
      role: "admin",
      ipAddress: "127.0.0.1",
      userAgent: "Windows",
    });

    await adminUser.save();
    console.log("Initial admin created successfully.");
  } else {
    console.log("Initial admin already exists.");
  }
};
