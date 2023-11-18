import express from 'express';
import pledgeRoutes from './routes/pledgeRoutes';
import connectDB from './database';

const app = express();
app.use(express.json());

console.log("connecting to database")
connectDB();

app.use('/api', pledgeRoutes);

export default app;
