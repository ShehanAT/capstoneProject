const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./routes/users');
const {mongoose} = require('./db.js');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('./api/models/db');
require('./api/config/passport');

var routesApi = require('./api/routes/index');

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//uncomment after placing favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200' }));

//initializing passport before using the route middleware
app.use(passport.initialize())
//this is the route middleware

app.use('/api', routesApi);//intiashiating /api route

//catch 404 and forward it to the global error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handlers
//for catching unauthorized errors
app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({"message": err.name + ": " + err.message});//returning the error message
    }
})

//for handling developement errors
//will print stacktrace
if(app.get('env') === 'development'){
    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
};

//for production errors, so the end user will not see the stacktrace and be confused
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
//app.listen(3000, () => console.log("Server started on port: 3000"));


