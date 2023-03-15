const express = require('express');
const userCtr = require('../../controllers/userController');
const { validateCreate } = require('../../validators/usersValidator');

const { authorization, rolAuth } = require('../../middlewares/auth');

const userRoute = express.Router();
// authorization, rolAuth(['Admin']), 
userRoute.get('/', userCtr.getAllUsers);
userRoute.get('/:id', userCtr.getUser);
userRoute.post('/', validateCreate, userCtr.registerUser);
userRoute.patch('/:id', validateCreate, userCtr.updateUser);
userRoute.delete('/:id', userCtr.deleteUser);

module.exports = userRoute;