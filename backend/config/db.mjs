import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) throw new Error('MONGO_URL is undefined');
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully 🐸');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
};

export default dbConnect;
