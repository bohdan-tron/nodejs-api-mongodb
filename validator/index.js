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