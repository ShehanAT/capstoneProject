const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

var sendJSONresponse = function(res, status, content){//sending json response
    res.status(status);
    res.json(content);
}

module.exports.register = function(req, res, next){

    var user = new User();
  
    user.username = req.body.username;
         
    user.emailAddress = req.body.emailAddress;
   
    user.fullName = req.body.fullName;
    
    user.age = req.body.age;
  
    user.setPassword(req.body.password);//causing error 
    user.save((err)=>{
        if(err){
            err.status = 400;
			return next(err);
        }
        var token = user.generateJwt();//generating json web token for the user object
        res.status(200);
        res.json({
            "token": token
        });
    });
};

module.exports.login = function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        var token; 
        
        //If Passport throws/catches an error
        if(err){
            res.status(404).json(err);
            return;
        }
        //if a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({//returning the json web token in json format
                "token": token
            });
        }else{
            //if user is not found
            res.status(401).json(info);
        }
    })(req, res);//what is this syntax?
};