'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../CONFIG.json');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'User is not logged in' });
        }
        const decodedData = jwt.verify(token, config.JWT_SECRET);
        req.user = decodedData;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'User is not logged in' });
    }
}