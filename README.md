# Prisma CRUD Authentication API

A Node.js Express API with Prisma ORM for user authentication, including signup, login, and password reset functionality via email.

## Features

- **User Registration** - Secure user signup with bcrypt password hashing
- **User Login** - JWT-based authentication with token generation
- **Password Reset** - Email-based password reset with time-limited tokens
- **MySQL Database** - Data persistence using Prisma ORM

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **bcrypt** - Password hashing
- **jsonwebtoken (JWT)** - Authentication tokens
- **nodemailer** - Email sending for password reset

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prisma-crud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

   > **Note:** For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations to create database tables
   npx prisma migrate dev --name init
   ```

## Running the Server

```bash
node index.js
```

The server will start on **http://localhost:5000**

## API Endpoints

### 1. User Signup
- **Endpoint:** `POST /signup`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created",
    "user": { ... }
  }
  ```

### 2. User Login
- **Endpoint:** `POST /login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt-token-here"
  }
  ```

### 3. Forgot Password
- **Endpoint:** `POST /forgot-password`
- **Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Reset link sent"
  }
  ```

### 4. Reset Password
- **Endpoint:** `POST /reset-password`
- **Body:**
  ```json
  {
    "token": "reset-token-from-email",
    "newPassword": "newpassword123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Password updated"
  }
  ```

## Database Schema

### User Model
| Field     | Type     | Description              |
|-----------|----------|--------------------------|
| id        | String   | Unique ID (cuid)         |
| email     | String   | Unique email address     |
| password  | String   | Hashed password          |
| createdAt | DateTime | Account creation date    |

### PasswordResetToken Model
| Field     | Type     | Description              |
|-----------|----------|--------------------------|
| id        | String   | Unique ID (cuid)         |
| email     | String   | User email               |
| token     | String   | Unique reset token       |
| expiresAt | DateTime | Token expiration time    |

## Project Structure

```
prisma-crud/
├── config/
│   └── email.js          # Email transporter configuration
├── prisma/
│   ├── schema.prisma     # Database schema definition
│   └── migrations/       # Database migrations
├── routes/
│   └── userRout.js       # User routes (if used)
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── index.js              # Main server file
├── package.json          # Project dependencies
└── README.md             # This file
```

## Security Notes

- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 1 day
- Password reset tokens expire after 15 minutes
- Never commit `.env` file to version control

## License

ISC