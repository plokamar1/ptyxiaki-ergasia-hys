var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//add support for mongo database with objects
var mongoose = require('mongoose');

//add support for enviroment variables throught .env files and red the file
var config = require('dotenv').config();

//base route to render angular
var appRoutes = require('./routes/app');

//routes for authentication
var authRoutes= require ('./routes/auth')

var app = express();

//connect to database with enviroment variables credentials
var options = {
    user: process.env.DBUSER,
    pass: process.env.DBPASSWORD
}


mongoose.connect(process.env.DBHOST+"/"+process.env.DBNAME, options, function(error){
    console.log(error);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});



//call authentication routes before application base route else the will be ingored
//request for authentication from angular will go to /auth
app.use('/auth', authRoutes);

//use the base route to render angular
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
