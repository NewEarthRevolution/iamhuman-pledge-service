require('dotenv').config()
import app from './app'; 
import database from './database';
import './services/pledgeChangeStream';
import './services/pledgePublisher';

console.log('MongoDB URI in server.ts:', process.env.MONGO_URI);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));