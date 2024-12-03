import mongoose from 'mongoose';

// Connect to MongoDB using Mongoose
export const dbconnect =()=> {mongoose.connect('mongodb://localhost:27017/Mahfazty')
.then(() => console.log('Database connected successfully 🐢'))
.catch((err) => {console.error('Database connection error:')
  return err
});

}