'use strict';

const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const config = require('../../CONFIG.json');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

function generateAccessToken(id, roles) {
    const payload = {
        id, 
        roles
    };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '24h' });
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error' });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: 'User with this name already exists' });
            }
            const hashPassword = bcrypt.hashSync(password, config.SALT);
            const userRole = await Role.findOne({ value: "USER" });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json({ message: 'User is successfully registered' });
        } catch (err) {
            res.status(400).json({ message: 'Login error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Password is incorrect' });
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({ token });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users); 
        } catch (err) {
            console.log(err);
            
        }
    }
}

module.exports = new AuthController();