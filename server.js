// For handling route and creating a server
const express = require("express");

// Database connectionz
const connectDb = require("./config/dbConnection");

// For security - keeps sensitive information out of the source code
const dotenv = require("dotenv").config();

// User build error handlers
const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDb();

const port = process.env.PORT || 3000;

// MiddleWare - Middleware is a function that sits between the request and response cycle in a web application. It processes incoming requests before they reach the final route handler and before responses are sent back to the client.
app.use(express.json());
// https://localhost:3001/

app.use('/api/contacts', require("./routes/contactRoutes"))
app.use('/api/users', require("./routes/userRoutes"))

app.use(errorHandler)

// Server listening at port 3001
app.listen(port, () => {console.log(`Server running on ${port}`)})
