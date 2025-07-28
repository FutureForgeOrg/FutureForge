import BaseUser from "../models/BaseUser.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtToken.js";
import Job from "../models/JobSchema.js";
import Portfolio from "../models/Portfolio.js";
import DeployedPortfolio from "../models/DeployedPortfolio.js";
import dayjs from "dayjs";

export const createAdmin = async (req, res) => {
    const { username, email, password, gender, role } = req.body;

    if (!username || !email || !password || gender === undefined || !role) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (role !== "admin" && role !== "user") {
        return res.status(400).json({
            message: "Invalid role"
        });
    }

    try {
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
            isVerified: true,
            ipAddress: req.ip || req.headers["x-forwarded-for"] || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
        });

        await newUser.save();

        // generateToken(newUser._id, newUser.email, res);

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


export const getDashboardData = async (req, res) => {

    try {
        // Promise.all to fetch all counts concurrently -> parallel execution
        const [totalUsers, totalAdmins, totalJobs, totalPortfolios, DeployedPortfolios] = await Promise.all([
            BaseUser.countDocuments({ role: "user" }),
            BaseUser.countDocuments({ role: "admin" }),
            Job.countDocuments(),
            Portfolio.countDocuments(),
            DeployedPortfolio.countDocuments(),
        ]);

        // get new User,jobs, Portfolios, DeployedPortfolios created in this month
        const startofMonth = dayjs().startOf('month').toDate();

        const [newUsers, newJobs, newPortfolios, newDeployedPortfolios] = await Promise.all([
            BaseUser.countDocuments({ role: "user", createdAt: { $gte: startofMonth } }),
            Job.countDocuments({ scraped_date: { $gte: startofMonth } }),
            Portfolio.countDocuments({ createdAt: { $gte: startofMonth } }),
            DeployedPortfolio.countDocuments({ createdAt: { $gte: startofMonth } }),
        ]);

        // get signups per month, across all time
        const monthyUserStats = await BaseUser.aggregate([
            {
                $match: {
                    role: "user",
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } }, // group by month and year, extract month and year from createdAt
                    count: { $sum: 1 } // add +1 for each user in that month and year
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // sort by month
            }
        ]);

        // get jobs scraped per month, across all time
        const monthlyJobStats = await Job.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$scraped_date" }, year: { $year: "$scraped_date" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        const genderDistribution = await BaseUser.aggregate([
            {
                $match: { role: "user" } // only for users
            },
            {
                $group: {
                    _id: "$gender",
                    count: { $sum: 1 }
                }
            }
        ]);

        const roleDistribution = await BaseUser.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json({
            summary : {
                totalUsers,
                totalAdmins,
                totalJobs,
                totalPortfolios,
                totalDeployedPortfolios: DeployedPortfolios,
                newUsers,
                newJobs,
                newPortfolios,
                newDeployedPortfolios
            },
            charts: {
                monthlyUserStats: monthyUserStats,
                monthlyJobStats: monthlyJobStats,
                genderDistribution: genderDistribution,
                roleDistribution: roleDistribution
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


