const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware');

//User Controller
router.post('/register', authController.register);
router.post('/login', authController.login);


module.exports = router;
