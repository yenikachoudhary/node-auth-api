# Auth API

A simple authentication API built using Node.js, Express, MongoDB and Mongoose.

The project provides user signup, OTP based email verification and login functionality.

## Features

- User signup
- Password hashing using bcrypt
- OTP generation during registration
- OTP sent through Gmail SMTP
- OTP verification
- OTP expiry after 10 minutes
- MongoDB database
- Login with password verification
- Postman collection for API testing

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- Nodemailer
- dotenv
- Postman

## Project Structure

```text
auth-api/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   └── otpModel.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── utils/
│   │   ├── otp.js
│   │   └── sendEmail.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── auth-api.postman.json
├── package.json
├── package-lock.json
└── README.md