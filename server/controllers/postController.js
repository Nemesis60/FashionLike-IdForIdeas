const postsModel = require('../models/postModel')
const usersModel = require('../models/userModel')

// method: GET
const getAllPosts = async (req, res) => {
    try {
        const posts = await postsModel.find().populate('UserCreator');

        if (posts) {
            res.status(200).json({ posts });
        } else {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        console.log('GetAllPosts error: ', error);
    }
}

// method: GET
const getPost = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await postsModel.findById(id).populate('UserCreator');

        if (user) {
            res.status(200).json({ post });
        } else {
            res.status(404).json({ error: error.message });
        }
    } catch (error) {
        console.log('GetPost error: ', error);
    }
}

// method: POST
const createPost = async (req, res) => {
    try {
        const { UserCreator, image } = req.body;

        const newPostObject = {
            UserCreator, image
        }

        const postCreated = await postsModel.create(newPostObject);

        if (postCreated) {
            res.status(201).json({ postCreated });
        } else {
            res.status(403).json({ error: error.message });
        }
    } catch (error) {
        console.log('CreatePost error: ', error);
    }
}

// method: PATCH
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, likes, dislikes } = req.body;

        const postObject = {
            image, likes, dislikes
        }
        
        const postUpdated = await postsModel.findByIdAndUpdate(id, postObject, { new: true });

        if (postUpdated) {
            res.status(201).json({ postUpdated });
        } else {
            res.status(403).json({ error: error.message });
        }
    } catch (error) {
        console.log('UpdatePost error: ', error);
    }
}

// method: DELETE
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const postDeleted = await postsModel.findByIdAndDelete(id);

        if (postDeleted) {
            res.status(201).json({ deleted: 'Post Deleted' });
        } else {
            res.status(401).json({ error: error.message });
        }
    } catch (error) {
        console.log('DeletePost error: ', error);
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}