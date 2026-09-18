const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const OTP = require("../models/otpModel");

const generateOTP = require("../utils/otp");
const sendOTP = require("../utils/sendEmail");

const router = express.Router();
// signup

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Signup request received");
        console.log("Email:", email);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = generateOTP();

        console.log("Generated OTP:", otp);

        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await OTP.deleteMany({ email });

        await OTP.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt
        });

        await sendOTP(email, otp);

        console.log("OTP sent successfully");

        res.status(200).json({
            message: "OTP sent successfully",
            email: email
        });

    } catch (error) {
        console.log("Signup error:");
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// verify otp

router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        console.log("OTP verification request received");

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({
                message: "OTP not found or expired"
            });
        }

        if (new Date() > otpRecord.otpExpiresAt) {

            await OTP.deleteOne({ _id: otpRecord._id });

            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        if (otp !== otpRecord.otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        const user = await User.create({
            name: otpRecord.name,
            email: otpRecord.email,
            password: otpRecord.password,
            isVerified: true
        });

        await OTP.deleteOne({
            _id: otpRecord._id
        });

        console.log("User verified successfully");

        res.status(201).json({
            message: "User registered and verified successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        });

    } catch (error) {
        console.log("OTP verification error:");
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

// login 

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login request received");
        console.log("Email:", email);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        console.log("Login successful");

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        });

    } catch (error) {
        console.log("Login error:");
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

module.exports = router;