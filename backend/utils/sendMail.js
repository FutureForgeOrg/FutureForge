import dotenv from "dotenv"
dotenv.config();
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    await transporter.sendMail({
        from: `"FutureForge" <${process.env.EMAIL_USER }>`,
        to,
        subject,
        text,
    });
};
