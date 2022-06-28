'use strict';

const Router = require('express');
const AuthController = require('./auth.controller');

const router = new Router();

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.get('/users', AuthController.getUsers);

module.exports = router;