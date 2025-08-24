import BaseUser from "../models/BaseUser.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtToken.js";
import Job from "../models/JobSchema.js";
import Portfolio from "../models/Portfolio.js";
import DeployedPortfolio from "../models/DeployedPortfolio.js";
import dayjs from "dayjs";

export const createAdmin = async (req, res) => {
    const { username, email, password, gender } = req.body;

    if (!username || !email || !password || gender === undefined) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // if (role !== "admin" && role !== "user") {
    //     return res.status(400).json({
    //         message: "Invalid role"
    //     });
    // }

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
            role: "admin", // default role for admin creation
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

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "Invalid email address"
            });
        }

        const user = await BaseUser.findOne({ email });

        if (user.isVerified === false) {
            return res.status(403).json({
                message: "Email not verified. Please check your inbox for the verification email."
            });
        }

        // validate for admin login
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Only admins can login."
            });
        }

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        generateToken(user._id, user.email, res);

        const userToSend = user.toObject();
        delete userToSend.password;

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: userToSend
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
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

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const formattedMonthlyUserStats = monthyUserStats.map((entry) => ({
            name: `${monthNames[entry._id.month - 1]} ${entry._id.year}`,
            Users: entry.count,
        }));

        const formattedMonthlyJobStats = monthlyJobStats.map((entry) => ({
            name: `${monthNames[entry._id.month - 1]} ${entry._id.year}`,
            Jobs: entry.count,
        }));

        const mockMonthlyUsersData = [
            { "name": "May 2025", "Users": 1 },
            { "name": "Jun 2025", "Users": 3 },
            { "name": "Jul 2025", "Users": 2 }
        ]

        const mockMonthlyJobsData = [
            { "name": "May 2025", "Jobs": 120 },
            { "name": "Jun 2025", "Jobs": 234 },
            { "name": "Jul 2025", "Jobs": 348 }
        ];

        return res.status(200).json({
            summary: {
                totalUsers,
                // totalAdmins,
                totalJobs,
                totalPortfolios,
                totalDeployedPortfolios: DeployedPortfolios,
                newUsers,
                newJobs,
                newPortfolios,
                newDeployedPortfolios
            },
            charts: {
                monthlyUserStats: formattedMonthlyUserStats,
                monthlyJobStats: formattedMonthlyJobStats,
                // monthlyUserStats: mockMonthlyUsersData,
                // monthlyJobStats: mockMonthlyJobsData,
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

export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, email } = req.query;
        const skip = (page - 1) * limit;

        const query = { role: "user" };

        // If email is provided, filter by email
        if (email) {
            query.email = { $regex: email, $options: 'i' }; // case-insensitive search
        }

        const users = await BaseUser.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .select("-password -__v") // Exclude password and __v field
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order

        const totalUsers = await BaseUser.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(200).json({
            users,
            totalUsers,
            totalPages,
            currentPage: parseInt(page)
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


export const banUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await BaseUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        // if (user.role !== "user") {
        //     return res.status(400).json({
        //         message: "Only users can be banned"
        //     });
        // }

        user.isBanned = true;
        await user.save();

        return res.status(200).json({
            message: "User has been banned",
            user: { ...user.toObject(), password: undefined }
        });
    } catch (error) {
        console.error("Error banning user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


export const unBanUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await BaseUser.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        // if (user.role !== "user") {
        //     return res.status(400).json({
        //         message: "Only users can be banned"
        //     });
        // }

        user.isBanned = false;
        await user.save();

        return res.status(200).json({
            message: "User has been unbanned",
            user: { ...user.toObject(), password: undefined }
        });

    } catch (error) {
        console.error("Error unbanning user:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getJobById = async (req, res) => {
    const jobId = req.params.jobId;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        return res.status(200).json({
            job
        });

    } catch (error) {
        console.error("Error fetching job:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


export const updateJobById = async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Map request body to actual schema fields
        if (req.body.job_title !== undefined) job.job_title = req.body.job_title;
        if (req.body.company !== undefined) job.company_name = req.body.company;  // mapping
        if (req.body.location !== undefined) job.location = req.body.location;
        if (req.body.description !== undefined) job.description = req.body.description;
        if (req.body.apply_link !== undefined) job.job_link = req.body.apply_link; // mapping

        await job.save();

        return res.status(200).json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



export const deleteJobById = async (req, res) => {
    const jobId = req.params.jobId;

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

