'use strict';

const Router = require('express');
const AuthController = require('./auth.controller');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = new Router();

router.post('/registration', [
    check('username', 'Name cannot be empty').notEmpty(),
    check('password', 'Password must not be shorter than 4 characters').isLength({ min: 4 })
], AuthController.registration);
router.post('/login', AuthController.login);
router.get('/users', roleMiddleware(['ADMIN']), AuthController.getUsers);

module.exports = router;