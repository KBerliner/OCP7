// MongoDB User Password: aLeolmFFq13QAqzL
// MongoDB Connection: mongodb+srv://berlinerkyle:<password>@groupomania.7zu8qkt.mongodb.net/


// Installing Dependencies

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(express.json());

// Connecting to MongoDB

mongoose.connect('mongodb+srv://berlinerkyle:aLeolmFFq13QAqzL@groupomania.7zu8qkt.mongodb.net/')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });


// Header Middleware

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// API Request Routing

app.use('/api/', postRoutes);
app.use('/api/', userRoutes);

// Export

module.exports = app;