import mongoose from 'mongoose';
import { startChangeStream } from './services/pledgeChangeStream';


const connectDB = async (): Promise<void> => {
  console.log('MongoDB URI in database.ts:', process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI!)
    .then(() => { 
      console.log('MongoDB connected');
      startChangeStream();
    })
    .catch(err => console.error('MongoDB connection error:', err));
};

export default connectDB;
