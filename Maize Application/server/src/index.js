import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRoute from './routers/auth.router.js';
import userRouter from './routers/auth.router.js';

dotenv.config();

const app = express();
app.use(express.json());


const MONGO_URI = process.env.MONGO_URI ;
const SESSION_SECRET = process.env.SESSION_SECRET ;

// 🔹 Session Configuration
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
      maxAge: 15 * 60 * 1000, // 15 minutes (in milliseconds)
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      httpOnly: true, 
    },
  })
);

// 🔹 Middleware to Check Session Timeout
app.use((req, res, next) => {
  if (req.session.user) {
    // If session exists, reset expiration timer
    req.session.touch();
  }
  next();
});

// 🔹 Authentication Routes
app.use("/auth", authRoute);
app.use("/users", userRouter);

// 🔹 Logout Route (Destroy Session)
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});
app.get("/home",(req,res)=>{
    res.json({"message": "welcome to Maize home page"})
})
// 🔹 Handle Invalid Routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
