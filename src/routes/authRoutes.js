const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const generateOTP = require("../utils/otp");
const sendOTP = require("../utils/sendEmail");

const router = express.Router();

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

        await sendOTP(email, otp);

        console.log("OTP sent successfully");

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        });

    } catch (error) {
        console.log("Signup error:");
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

module.exports = router;