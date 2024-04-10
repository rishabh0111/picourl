const { check, validationResult } = require('express-validator');

exports.validateUrl = [
  check('longUrl')
    .notEmpty()
    .isURL()
    .withMessage('Please provide a valid URL'),
  check('expirationDate')
    .optional()
    .isDate()
    .withMessage('Expiration date must be a valid date'),
  check('maxClicks')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum clicks must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateAuth = [
  check('email')
    .notEmpty()
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .notEmpty()
    .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];