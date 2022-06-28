'use strict';

const Router = require('express');
const AuthController = require('./auth.controller');
const { check } = require('express-validator');

const router = new Router();

router.post('/registration', [
    check('username', 'Name cannot be empty').notEmpty(),
    check('password', 'Password must not be shorter than 4 characters').isLength({ min: 4 })
], AuthController.registration);
router.post('/login', AuthController.login);
router.get('/users', AuthController.getUsers);

module.exports = router;