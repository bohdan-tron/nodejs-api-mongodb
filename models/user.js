const {Schema, ObjectId, model} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 32
  },
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  address: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  role: {
    type: [String],
    default: ["Buyer"],
    enum: ["Buyer", "Seller", "Admin", "Author"]
  },
  photo: {

  },
  logo: {},
  company: {
    type: String,
    trim: true,
    default: ""
  },
  enquiredProperties: [{type: ObjectId, ref: 'Ad'}],
  wishlist: [{type: ObjectId, ref: 'Ad'}],
  about: {
    type: String,
    trim: true,
    default: ""
  }
}, {timestamps: true});

module.exports = model('User', userSchema);
