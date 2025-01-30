const router = require('express').Router();
const { login } = require('../controllers/auth');
const validator = require('../validator');

router.post('/login', validator.createUser, login);

module.exports = router;