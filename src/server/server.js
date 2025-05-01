import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import sessionRoutes from './routes/sessionRouter.js';
import jwtRoutes from './routes/tokenRouter.js';
import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,  
  cookie: { secure: false },
}));

// base route
app.use('/api/sessionAuth', sessionRoutes);
app.use('/api/tokenAuth', jwtRoutes);

mongoose.connect(process.env.MONGODBURI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
