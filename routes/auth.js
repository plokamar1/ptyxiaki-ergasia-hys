//routes for authenticating such us login-register
var express = require('express');
var router = express.Router();
//bcrypt library to encrypt password
var bcrypt = require('bcryptjs');
//json token creation for authentication
var jwt = require('jsonwebtoken');

//load user model
var User = require('../models/user');


//post request for a user mean sign up (register a user)
router.post('/signup', function (req, res, next) {
    //get user data from request
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        //encrypt password with bcrypt library
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        registrationMethod:'site'
    });
    //save user to database
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        //return created user object
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

//if we get a post request in signin then we need to create a token
router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        //general mongoose error
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        //no user found
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        //password dont mattch
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }

        //succesfully logg in . create the token
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

module.exports = router;