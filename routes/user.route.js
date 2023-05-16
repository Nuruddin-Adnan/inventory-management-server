const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', verifyToken, userController.getMe);

module.exports = router;