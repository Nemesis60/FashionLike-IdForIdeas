const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    UserCreator: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }],
    dislikes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }]
}, { timestamps: true, versionKey: false }
);

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;