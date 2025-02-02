import { PrismaClient } from '@prisma/client';
import otpGenerator from 'otp-generator';
import { sendVerificationEmailNodeMailer } from '../lib/sendVerificationMail.js';

const prisma = new PrismaClient();

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already exists
        const userExist = await prisma.user.findUnique({
            where: { email }
        });

        if (userExist) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            });
        }

        // Generate a 6-digit OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        console.log(otp, ">> OTP generated");

        // Set OTP expiry (5 minutes from now)
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

        // Create a new user entry with OTP (but no password yet)
        await prisma.user.create({
            data: {
                email,
                verifyCode: otp,
                verifyCodeExpiry: otpExpiry
            }
        });

        // Send OTP via email
        await sendVerificationEmailNodeMailer(email, email.split("@")[0], otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            email
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
};
