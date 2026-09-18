const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Original password:", password);
        console.log("Hashed password:", hashedPassword);

        res.json({
            message: "Password hashed successfully",
            hashedPassword: hashedPassword
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

module.exports = router;