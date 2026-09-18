const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Auth API is running"
    });
});

app.use("/api/auth", authRoutes);

module.exports = app;