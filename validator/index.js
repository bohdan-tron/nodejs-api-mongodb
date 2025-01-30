const { check, validationResult } = require('express-validator');

exports.createPost = [
  check('title')
    .trim()
    .notEmpty().withMessage('title is required')
    .isLength({ min: 4, max: 128 }).withMessage('title must be between 4 and 128 characters'),
  
  check('subtitle')
    .optional()
    .trim()
    .isLength({ min: 4, max: 255 }).withMessage('subtitle must be between 4 and 255 characters'),
  
  check('body')
    .trim()
    .notEmpty().withMessage('body is required')
    .isLength({ min: 2, max: 3600 }).withMessage('body must be between 2 and 3600 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.createUser = [
  // check('username')
  //   .trim()
  //   .notEmpty().withMessage('Username is required')
  //   .isLength({ max: 32 }).withMessage('Username must be at most 32 characters'),

  check('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 64 }).withMessage('Password must be between 6 and 64 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
