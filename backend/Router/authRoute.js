const express = require('express');
const { googleLogin,EmailSignup } = require('../Controller/authController');
const GoogleLoginUser  = require('../utils/GoogleLoginUser');
const router = express.Router();

router.post('/googlelogin',GoogleLoginUser,googleLogin)
router.post('/emailSignup',GoogleLoginUser,EmailSignup)

module.exports=router