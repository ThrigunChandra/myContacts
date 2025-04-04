# myContacts

myContacts is a secure backend application that allows users to manage their personal contact information. The app supports full authentication using JWT and ensures that each user can only access and manage their own contact data.

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (JSON Web Tokens)**
- **bcrypt (for password hashing)**

## ✨ Features

- ✅ User Signup & Login
- ✅ JWT-based Authentication
- ✅ Secure access to user-specific contacts
- ✅ Create, Read, Update, and Delete (CRUD) contact entries
- ✅ Passwords are securely hashed using bcrypt

## 🔒 Authentication

- Users receive a JWT upon login
- All protected routes validate JWT tokens
- Contacts are user-specific and cannot be accessed by other users

## 📦 Future Updates

- 🔧 Frontend using **React.js**
- 🔍 Add **search functionality** for filtering contacts
- 🧾 Pagination for large contact lists
- 📱 Improved contact data validation (e.g., email/phone formats)

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/ThrigunChandra/myContacts.git
cd myContacts
npm install
```
---

### Environment Variables

Create a `.env` file in the root of your project directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
```

> ⚠️ Make sure your `.env` file is listed in `.gitignore` so it doesn't get pushed to GitHub.

### Run the Server

```bash
npm start
```

Server runs on `http://localhost:5000` (or your configured port)

---

Let me know if you'd like me to add an **API endpoint reference**, **Postman collection**, or help with the **frontend once it's ready**.
```

---

You can now copy this into your `README.md`. Let me know if you want to include any sample API usage next!
