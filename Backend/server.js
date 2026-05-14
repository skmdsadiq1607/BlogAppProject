// Create express application
import 'dotenv/config'
import exp from 'express'

import { connect } from 'mongoose'
import { userApp } from './APIs/UserAPI.js';
import { authorApp } from './APIs/AuthorAPI.js';
import { adminApp } from './APIs/AdminAPI.js';
import { commonApp } from './APIs/CommonAPI.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = exp()


// 1. CORS Configuration (MUST BE FIRST)
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(',')
  .map(o => o.trim().replace(/\/$/, '').toLowerCase());

console.log("Allowed Origins:", allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // For debugging: allow all origins but log the origin
    console.log("Request Origin:", origin);
    callback(null, true); 
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

// 2. Body Parser and Cookies
app.use(exp.json());
app.use(cookieParser())

// 3. API Routes
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);
app.use('/auth', commonApp);

// 4. Invalid Path Handler
app.use((req, res, next) => {
  res.status(404).json({ message: `path ${req.url} is invalid` })
})

// 5. Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("!!! DETAILED ERROR LOG !!!");
  console.error("Name:", err.name);
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  
  // Send back the error message to help debugging in the browser console
  res.status(err.status || 500).json({
    message: "Server side error occurred",
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});


// 6. Connect to DB and Start Server
const connectDB = async () => {
  const primaryUrl = process.env.DB_URL;
  const fallbackUrl = process.env.LOCAL_DB_URL;

  try {
    console.log("Attempting to connect to primary database...");
    await connect(primaryUrl);
    console.log("connected to database");
  } catch (err) {
    console.error("error in primary db connection:", err.message);

    if (fallbackUrl && fallbackUrl !== primaryUrl) {
      console.log("Attempting fallback local database URL...");
      try {
        await connect(fallbackUrl);
        console.log("connected to fallback local database");
      } catch (fallbackErr) {
        console.error("fallback database connection failed:", fallbackErr.message);
      }
    }
  }
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port} [v2.1-cors-fix]`);
  connectDB();
});
