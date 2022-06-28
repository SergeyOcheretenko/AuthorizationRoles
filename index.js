'use strict';

const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();

function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();