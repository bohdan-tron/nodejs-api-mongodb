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
  const post = new Post(req.body);

  await post.save()
    .then(result => {
      res.status(200).json({post: result})
    });
}