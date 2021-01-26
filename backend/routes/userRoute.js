const express = require('express');
const rateLimit = require("express-rate-limit");
const router = express.Router();
const userCtrl = require('../controllers/userController');
const verifyPassword = require('../middleware/verif-password');

const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,    // 15 minutes
    max: 2                      // limit each IP to 100 requests per windowMs
});

router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', apiLimiter, userCtrl.login);

module.exports = router;