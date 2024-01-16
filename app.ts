import express from 'express';
import pledgeRoutes from './routes/pledgeRoutes';
import connectDB from './database';
import rateLimit from 'express-rate-limit';

const cors = require("cors");
const app = express();

// Define rate limit settings
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply the rate limit to all requests
app.use(apiLimiter);
app.use(express.json());

console.log("connecting to database");
connectDB();

app.options('/api/pledges', cors());
app.use('/api', pledgeRoutes);

export default app;
