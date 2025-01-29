const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'title is required',
    minlength: 4,
    maxlength: 128,
  },
  subtitle: {
    type: String,
    required: false,
    minlength: 4,
    maxlength: 255,
  },
  body: {
    type: String,
    required: 'body is required',
    minlength: 2,
    maxlength: 3600,
  },
})

module.exports = mongoose.model('Post', postSchema);
