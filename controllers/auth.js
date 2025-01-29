const Post = require("../models/post");

exports.login = async (req, res) => {
  try {
    const posts = await Post.find().select("_id title subtitle body");
    res.json({ posts });
  } catch (err) {
    res.status(500)
      .json({ message: "Internal Server Error" });
  }
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);

  post.save().then(post => res.json({post}));
}