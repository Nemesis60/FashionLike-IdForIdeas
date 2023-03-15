const express = require('express');
const postCtr = require('../../controllers/postController');

const postRoute = express.Router();

postRoute.get('/', postCtr.getAllPosts);
postRoute.get('/:id', postCtr.getPost);
postRoute.post('/', postCtr.createPost);
postRoute.patch('/:id', postCtr.updatePost);
postRoute.delete('/:id', postCtr.deletePost);

module.exports = postRoute;