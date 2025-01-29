const Post = require("../models/post");

exports.getPosts = (req, res) => {
  res.json({
    posts: [
      { title: 'First post' },
      { title: 'Second post' }
    ]
  })
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}