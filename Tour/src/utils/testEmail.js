import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Test transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Transporter Error:", error);
    } else {
        console.log("✅ Email Server is ready to send messages");
    }
});
