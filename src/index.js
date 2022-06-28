'use strict';

const express = require('express');
const mongoose = require('mongoose');
const config = require('../CONFIG.json');
const authRouter = require('./auth/auth.router');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

async function start() {
    try {
        await mongoose.connect(config.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`); 
        });
    } catch (err) {
        console.log(err);
    }
}

start();