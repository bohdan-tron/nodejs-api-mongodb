const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const validator = require('../validator');

const router = express.Router();

router.get('/', getPosts);
router.post('/post', validator.createPost, createPost);

module.exports = router;