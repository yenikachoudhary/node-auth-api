require("dotenv").config();

console.log("Email user:", process.env.EMAIL_USER);
console.log("Email password exists:", !!process.env.EMAIL_PASS);

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});