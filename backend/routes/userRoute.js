const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');
const verifyPassword = require('../middleware/verif-password');

router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;