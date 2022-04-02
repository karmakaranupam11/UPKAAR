const express = require('express');
const { register, login, getUser, updatePassword, logout } = require('../../Controllers/users');
const { isAuthenticated } = require('../middlewares/authentication');

const router = express.Router();

// here in routes we make apis for the backend

// route for sign up
router.route("/register").post( register );

// route for login
router.route("/login").post( login );

// route for updating password
router.route("/update/password").put(isAuthenticated, updatePassword);

// route for logging out 

router.route("/logout").get(logout);

// route for getting the user
router.route("/getUser").get( isAuthenticated,getUser );



module.exports = router;