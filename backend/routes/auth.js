const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../config/db');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function signToken(payload) {
  if (!JWT_SECRET) {
    throw new Error('Missing environment variable: JWT_SECRET');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

router.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: 'Email, username, and password are required',
      });
    }

    const { db } = await connectToDatabase();
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'A user with this email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await users.insertOne({
      email,
      username,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const userId = result.insertedId.toString();
    const accessToken = signToken({ userId, email, role: 'user' });

    return res.status(201).json({
      accessToken,
      user: {
        id: userId,
        email,
        username,
        role: 'user',
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const { db } = await connectToDatabase();
    const users = db.collection('users');

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const userId = user._id.toString();
    const accessToken = signToken({ userId, email, role: user.role });

    return res.json({
      accessToken,
      user: {
        id: userId,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const newToken = signToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    return res.json({ accessToken: newToken });
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
