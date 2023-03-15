const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });
        if (!user) {
            res.status(401).json({ message: "Incorrect Credentials" });
            return;
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            res.status(401).json({ message: "Incorrect Credentials" });
            return;
        }

        const userTokenInfo = {
            id: user._id,
            username: user.username,
            rol: user.rol
        }

        const userToken = jwt.sign(
            userTokenInfo, process.env.SECRET,
            {
                expiresIn: 60 * 60 * 24 * 7
            }
        );

        res.cookie('jwt', userToken, {
            httpOnly: true, //accessible only by web server 
            secure: process.env.NODE_ENV === 'production', //https
            sameSite: 'none', //cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 10 //cookie expiry: set to match rT
        });
        
        res.send({ username: user.username, email: user.email, token: userToken});
    } catch (error) {
        console.log('Login error: ', error)
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none',
        secure: process.env.NODE_ENV === 'production' });
        res.json({ message: 'Cookie Cleared' });
    } catch (error) {
        console.log('Logout error: ', error)
    }
}

module.exports = {
    login,
    logout
}