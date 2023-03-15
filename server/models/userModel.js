const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    rol: {
        type: String,
        trim: true,
        capitalize: true,
        default: 'User'
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Posts'
    }],
    likedPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Posts'
    }],
    dislikedPosts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Posts'
    }]
}, { timestamps: true, versionKey: false }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;