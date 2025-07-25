import dotenv from "dotenv"
dotenv.config();
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
    // Validate inputs
    if (!to || !subject || !text) {
        throw new Error('Missing required email parameters');
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
        throw new Error('Invalid email address');
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        await transporter.sendMail({
            from: `"FutureForge" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send email');
    }
};
