'use strict';

const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const config = require('../../CONFIG.json');

class AuthController {
    async registration(req, res) {
        try {
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

        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async getUsers(req, res) {
        try {
            res.json("server work"); 
        } catch (err) {
            console.log(err);
            
        }
    }
}

module.exports = new AuthController();