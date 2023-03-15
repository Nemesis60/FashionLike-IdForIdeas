const express = require('express');
const authCtr = require('../../controllers/authController');

const authRoute = express.Router();

authRoute.post('/login', authCtr.login);
authRoute.post('/logout', authCtr.logout);

module.exports = authRoute;