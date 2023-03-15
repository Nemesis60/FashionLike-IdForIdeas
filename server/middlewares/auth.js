const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRET)
    } catch (error) {
        return console.log('Verify error: ', error)
    }
}

const authorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const decodedToken = await verifyToken(token);

        if (decodedToken.id) {
            next()
        } else {
            res.status(401).send({ error: "Apologies you need login" })
        }
    } catch (error) {
        console.log(error)
        res.status(409).send({ error: "Authorization error: ", error })
    }
}

const rolAuth = (rol) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const decodedToken = await verifyToken(token);
        const user = await userModel.findById(decodedToken.id);

        if ([].concat(rol).includes(user.rol)) {
            next()
        } else {
            res.status(401).send({ error: "Apologies you haven't permissions" })
        }
    } catch (error) {
        console.log(error)
        res.status(409).send({ error: "Rol Auth Error: ", error })
    }
}

module.exports = {
    authorization,
    rolAuth
}