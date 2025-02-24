const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  body: {
    type: String,
  },
})

module.exports = mongoose.model('Post', postSchema);
