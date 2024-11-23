const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Built-in body parser for JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

module.exports = app;
