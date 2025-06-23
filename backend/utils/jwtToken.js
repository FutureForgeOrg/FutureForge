import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const generateToken = (userId, email, res) => {
    const token = jwt.sign({
         userId, email 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: "10d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return token;
}

// further to implement
//  refresh token 
