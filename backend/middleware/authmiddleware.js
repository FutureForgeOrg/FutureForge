import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import BaseUser from "../models/BaseUser.js";

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - no token provided"
        });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({
                message: "Unauthorized - invalid token"
            });
        }

        const user = await BaseUser.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({
                message: "Unauthorized - user not found"
            });
        }

        if(user.isBanned){
            return res.status(403).json({
                message: "Forbidden - user is banned"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized - invalid token"
        });
    }
};

export const checkRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role){
            return res.status(403).json({
                message: "Forbidden - insufficient permissions"
            });
        }
        next();
    }
}
