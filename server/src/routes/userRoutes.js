const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateAuth } = require('../middleware/validator');

router.post('/register', validateAuth, userController.registerUser);
router.post('/login', validateAuth, userController.loginUser);

module.exports = router;