import bcrypt from "bcrypt";
import crypto from "crypto";
import BaseUser from "../models/BaseUser.js";
import EmailVerificationToken from "../models/EmailVerificationToken.js";
import { generateToken } from "../utils/jwtToken.js";
import { sendMail } from "../utils/sendMail.js";
import Profile from "../models/ProfileSchema.js";

export const handleSignup = async (req, res) => {
    const { username, email, password, gender } = req.body;

    try {

        if (!username || !email || !password || !gender) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password.length < 4 || password.length > 32) {
            return res.status(400).json({
                message: "Password must be between 4 and 32 characters"
            });
        }

        if (gender !== "male" && gender !== "female") {
            return res.status(400).json({
                message: "Invalid gender"
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "Invalid email address"
            });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({
                message: "Username must be between 3 and 20 characters"
            });
        }

        const existingUser = await BaseUser.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new BaseUser({
            username,
            email,
            password: hashedPassword,
            gender,
            isVerified: false,
            // expiresAt: new Date(Date.now() + 60 * 60 * 1000), // auto-delete after 1 hour if not verified
            // no email verifn currently so no auto delete not verified users
            expiresAt: undefined,
            ipAddress: req.ip || req.headers["x-forwarded-for"] || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
        });

        // const FRONTEND_URL = process.env.NODE_ENV === 'production'
        //     ? process.env.DEPLOYED_FRONTEND_URL
        //     : process.env.FRONTEND_URL;

        // if(!FRONTEND_URL){
        //     throw new Error("FRONTEND_URL is not defined in environment variables");
        // }

        // const token = crypto.randomBytes(32).toString("hex");
        // const link = `${FRONTEND_URL}/verify-email/${token}`;
        // await EmailVerificationToken.create({
        //     userId: newUser._id,
        //     token,
        //     resendCooldownUntil: new Date(Date.now() + 60 * 1000) // 60 seconds cooldown
        // });

        // await sendMail(email, "Verify your email", `Click the link to verify your email: ${link}`);

        // save user for email verification => if user leaves without verifying -> ttl index will delete user after 1 hour
        // await newUser.save();


        // no email verfn currently so no email sending
        if (newUser) {
            generateToken(newUser._id, newUser.email, res);
            await newUser.save();

            const userToSend = newUser.toObject();
            delete userToSend.password;

            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: userToSend,
            });
        }
        else {
            return res.status(400).json({
                message: "Invalid user data"
            });
        }

        // create empty profile for the user after signup
        const profile = new Profile({
            userId : newUser._id,
            name : newUser.username
        })

        await profile.save();

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export const handleLogin = async (req, res) => {
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

        // if (user.isVerified === false) {
        //     return res.status(403).json({
        //         message: "Email not verified. Please check your inbox for the verification email."
        //     });
        // }

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


export const handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


export const handleCheckAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User is authenticated",
            user: req.user
        });

    }
    catch (error) {
        console.error("Check auth error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// GET /verify-email/:token

export const handleEmailVerification = async (req, res) => {
    const { token } = req.params;

    try {
        const verificationToken = await EmailVerificationToken.findOne({ token });

        if (!verificationToken) {
            return res.status(400).json({
                message: "Invalid or expired verification token"
            });
        }

        const user = await BaseUser.findById(verificationToken.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.isVerified = true;
        user.expiresAt = undefined; // remove auto-delete expiration
        await user.save();

        const profile = new Profile({
            userId : user._id,
            name : user.username
        })

        await profile.save();

        // cleanup: delete the verification token - after successful verification
        await EmailVerificationToken.deleteOne({ _id: verificationToken._id });

        // generate JWT token for the user
        generateToken(user._id, user.email, res);

        const userToSend = user.toObject();
        delete userToSend.password;

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: userToSend
        });

    }
    catch (error) {
        console.error("Email verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await BaseUser.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (user.isVerified) {
            return res.status(400).json({
                message: "Email already verified"
            });
        }

        const existingToken = await EmailVerificationToken.findOne({ userId: user._id });

        console.log("existingToken:", existingToken);
        console.log("Now:", new Date());
        console.log("Cooldown Until:", existingToken?.resendCooldownUntil);

        if (existingToken && existingToken.resendCooldownUntil > new Date()) {
            const remainingTime = existingToken.resendCooldownUntil - new Date();
            const seconds = Math.ceil(remainingTime / 1000);

            return res.status(429).json({
                message: `Please wait ${seconds} seconds before requesting a new verification email`
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const link = `${process.env.FRONTEND_URL}/verify-email/${token}`;

        await EmailVerificationToken.findOneAndUpdate(
            { userId: user._id },
            {
                token,
                resendCooldownUntil: new Date(Date.now() + 60 * 1000) // 60 seconds cooldown
            },
            { upsert: true, new: true } // create if not exists, return updated document
        );

        await sendMail(email, "Verify your email", `Click the link to verify your email: ${link}`);

        res.status(200).json({
            success: true,
            message: "Verification email sent successfully"
        });
    } catch (error) {
        console.error("Resend verification email error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

