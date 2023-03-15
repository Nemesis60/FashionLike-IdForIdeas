const postsModel = require('../models/postModel');
const usersModel = require('../models/userModel');

const bcrypt = require('bcrypt')

// method: GET
const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.find();

        if (users) {
            res.status(201).json({ users });
        } else {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        console.log('GetAllUsers error: ', error);
    }
};

// method: GET
const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = usersModel.findById(id).populate('posts', { UserCreator: 0 });

        if (user) {
            res.status(201).json({ user });
        } else {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        console.log('GetUser error: ', error);
    }
};

// method: POST
const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const matchUsername = await usersModel.findOne({ username: username })
        const matchEmail = await usersModel.findOne({ email: email })
        if (matchUsername && matchEmail) {
            res.status(403).json({ message: 'Username and Email already used' })
            return;
        }
        if (matchUsername) {
            res.status(403).json({ message: 'Username already used' })
            return;
        }
        if (matchEmail) {
            res.status(403).json({ message: 'Email already used' })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUserObject = {
            username, email, password: hashPassword
        }

        const userCreated = await usersModel.create(newUserObject);
        
        if (userCreated) {
            res.status(201).json({ userCreated });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log('Register User error: ', error);
    }
};

// method: PATCH
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, posts, likedPosts, dislikedPosts } = req.body;

        const newUserUpdateObject = {
            username, email, password, posts, likedPosts, dislikedPosts
        };

        const updatedUser = await usersModel.findByIdAndUpdate(id, newUserUpdateObject, { new: true });

        if (updatedUser) {
            res.status(201).json({ updatedUser });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log('UpdateUser error: ', error);
    }


}

// method: DELETE
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usersModel.findById(id);
        if (user.rol === 'Admin') {
            res.status(401).json({ message: "You can't delete Admins" });
        }
        
        const deletedUser = await usersModel.findByIdAndDelete(id);
        
        if (deletedUser) {
            const postsDeleted = await postsModel.deleteMany({
                UserCreator: id
            });

            res.status(201).json({ deleted: 'User deleted' });
        } else {
            res.status(401).send({ error: error.message });
        }
    } catch (error) {
        console.log('DeleteUser error: ', error);
    }
};


module.exports = {
    getAllUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser
}