# Prisma CRUD Authentication API

A robust Node.js Express API with Prisma ORM for user authentication, featuring secure user registration, JWT-based login, and email-based password reset functionality.

## ✨ Features

- **User Registration** - Secure user signup with bcrypt password hashing
- **User Login** - JWT-based authentication with 24-hour token expiration
- **Password Reset** - Email-based password reset with time-limited tokens (15 minutes)
- **MySQL Database** - Reliable data persistence using Prisma ORM
- **Secure Password Handling** - Industry-standard bcrypt hashing (10 salt rounds)
- **Email Integration** - Gmail SMTP integration for password reset emails

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **Prisma** | Next-generation Database ORM |
| **MySQL** | Relational database management system |
| **bcrypt** | Password hashing library |
| **jsonwebtoken (JWT)** | Authentication token generation and verification |
| **nodemailer** | Email sending for password reset |
| **dotenv** | Environment variable management |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL Server** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** or **yarn** package manager

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd prisma-crud
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

> **⚠️ Important:** For Gmail, you must use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password. Regular passwords will not work for SMTP authentication.

### 4. Set Up the Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

## 🖥 Running the Server

### Development Mode

```bash
node index.js
```

### Using Nodemon (Auto-reload during development)

```bash
npm install -g nodemon
nodemon index.js
```

The server will start on **http://localhost:5000**

## 📡 API Endpoints

### Base URL
```
http://localhost:5000
```

---

### 1. User Signup

Register a new user account.

- **Endpoint:** `POST /signup`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Success Response (200 OK):**
```json
{
  "message": "User created",
  "user": {
    "id": "clh1a2b3c000008l5abcd1234",
    "email": "user@example.com",
    "password": "$2b$10$hashedpassword...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Error message here"
}
```

---

### 2. User Login

Authenticate user and receive JWT token.

- **Endpoint:** `POST /login`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Forgot Password

Send password reset link to user's email.

- **Endpoint:** `POST /forgot-password`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Reset link sent"
}
```

**Note:** For security, the response is the same whether the email exists or not.

---

### 4. Reset Password

Reset password using the token received via email.

- **Endpoint:** `POST /reset-password`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Password updated"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid token or token expired
- `500 Internal Server Error` - Server error

---

## 🗄 Database Schema

### User Model

Stores user account information.

| Field     | Type     | Attributes              | Description              |
|-----------|----------|-------------------------|--------------------------|
| id        | String   | @id @default(cuid())    | Unique identifier        |
| email     | String   | @unique                 | User's email address     |
| password  | String   | -                       | Bcrypt hashed password   |
| createdAt | DateTime | @default(now())         | Account creation date    |

### PasswordResetToken Model

Stores temporary password reset tokens.

| Field     | Type     | Attributes              | Description              |
|-----------|----------|-------------------------|--------------------------|
| id        | String   | @id @default(cuid())    | Unique identifier        |
| email     | String   | -                       | User's email address     |
| token     | String   | @unique                 | Reset token (hex)        |
| expiresAt | DateTime | -                       | Token expiration time    |

## 📁 Project Structure

```
prisma-crud/
├── config/
│   └── email.js              # Email transporter configuration
├── prisma/
│   ├── schema.prisma         # Database schema definition
│   ├── prisma-crud.code-workspace  # VS Code workspace file
│   └── migrations/           # Database migration files
├── routes/
│   └── userRout.js           # User route handlers
├── .env                      # Environment variables (DO NOT COMMIT)
├── .gitignore                # Git ignore rules
├── index.js                  # Main application entry point
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Dependency lock file
└── README.md                 # Project documentation
```

## 🔒 Security Features

- **Password Hashing** - All passwords are hashed using bcrypt with 10 salt rounds
- **JWT Tokens** - Authentication tokens expire after 24 hours
- **Reset Token Expiration** - Password reset tokens expire after 15 minutes
- **Secure Email** - Uses Gmail App Password for SMTP authentication
- **Environment Variables** - Sensitive data stored in `.env` file (not committed to git)

## 🧪 Testing the API

You can test the API using tools like:

- **Postman** - [Download](https://www.postman.com/downloads/)
- **Insomnia** - [Download](https://insomnia.rest/download)
- **cURL** - Command-line tool (pre-installed on most systems)

### Example cURL Requests

**Signup:**
```bash
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Forgot Password:**
```bash
curl -X POST http://localhost:5000/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Reset Password:**
```bash
curl -X POST http://localhost:5000/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"your-reset-token","newPassword":"newpassword123"}'
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL server is running
   - Check DATABASE_URL in `.env` file
   - Ensure database exists

2. **Email Not Sending**
   - Use Gmail App Password, not regular password
   - Enable "Less secure app access" or use App Password
   - Check EMAIL_USER and EMAIL_PASS in `.env`

3. **Port 5000 Already in Use**
   - Change port in `index.js` or kill the process using port 5000

4. **Prisma Client Not Generated**
   - Run `npx prisma generate`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with Node.js, Express, and Prisma ORM.

---

**Happy Coding! 🚀**