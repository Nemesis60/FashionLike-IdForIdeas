const { check } = require('express-validator');
const { validateResults } = require('../helpers/validateHelper');

const validateCreate = [
    check('username').exists().not().isEmpty(),
    check('email').exists().isEmail(),
    check('password').exists().not().isEmpty(),

    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = {
    validateCreate
}