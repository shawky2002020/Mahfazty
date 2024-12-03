import express from "express";
import { BASEURL } from "../util/url.mjs";
import { Users } from "../util/data.mjs";
import * as db from "../config/db.mjs";
import jwt from 'jsonwebtoken';
import {User,userSchema}from "../models/user.model.mjs";
import bcrypt from 'bcryptjs';
const router = express.Router();
router.use(express.json())
export default router;


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Extract from the request body
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json('لا يوجد حساب مفعل الرجاء انشاء حساب');
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send( 'كلمة السر غير صحيحة' );
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '30m',
    });
    // Send success response
    return res.status(200).json({
      token,
      data:user,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send(
       'An error occurred during login'
    );
  }
});


router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user already exists
    const findedUser = await User.findOne({ email });
    if (findedUser) {
      return res.status(400).send('هذا الحساب مسجل بالفعل');
    }

    // Create new user
    const newUser = await User.create(req.body);

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: '30m',
    });

    // Send success response
    return res.status(200).json({
      token,
      data:newUser,
    });
  } catch (err) {
    // Handle errors
    console.error('Registration error:', err);
    res.status(500).send(
      'An error occurred during login'
   );
  }
});