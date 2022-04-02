const User = require('../../Models/users');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {

    try {
        // taking tolen from cookies
        const { token } = req.cookies;

        // if token is not present then user is not logged in
        if (!token) {
            return req.status(401).json({
                message: "Please Login first"
            });
        }

        // for getting back the decoded data
        const decoded = await jwt.verify(token, "secret");

        // setting the user in req.user
        req.user = await User.findById(decoded._id);

        next();
    
    } catch (error) {
             res.status(500).json({
                 success : false,
                 message : error.message
             })
    }
};