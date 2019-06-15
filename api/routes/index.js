var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.PASSWORD,
    userProperty: 'payload'
});

const ctrlProfile = require('../controllers/userProfile');
const ctrlAuthRegister = require('../controllers/authentication').register;
const ctrlAuthLogin = require('../controllers/authentication').login;

//profile
router.get('/profile', auth, ctrlProfile.profileRead);//auth is the middleware used for authentication

//authentication
router.post('/register', ctrlAuthRegister);//for sending post request to server
router.post('/login', ctrlAuthLogin);

module.exports = router;