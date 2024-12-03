import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

export class Users{
  email;
  password;
}

const userSchema = new mongoose.Schema({
  email :{
    type:String,
    required :[true,'Please enter your E-mail'],
    unique:true, 
    lowercase:true
  },
  password :{
    type:String,
    required :[true,'Please enter your Password'],
    minlength:[8,"pass less than 8 characters"],
    // select:false
  }
},
{
  timsstamps:true,
});

userSchema.pre('save', async function (next) {
  // Check if the password has been modified
  if (!this.isModified('password')) return next();

  // Hash the password with a salt round of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model('User',userSchema)
export {User,userSchema};

