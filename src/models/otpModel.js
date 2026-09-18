const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        otp: {
            type: String,
            required: true
        },

        otpExpiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;