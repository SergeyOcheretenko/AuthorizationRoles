'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../CONFIG.json');

module.exports = function(roles) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            return next();
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'User is not logged in' });
            }
            const { roles: userRoles } = jwt.verify(token, config.JWT_SECRET);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: 'You do not have access' }); 
            }
            return next();
        } catch (err) {
            console.log(err);
            return res.status(403).json({ message: 'User is not logged in' });
        }
    }
};