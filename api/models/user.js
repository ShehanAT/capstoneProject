const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var User = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	fullName : {
		type: String,
		unique: true,
		required: true,
	},
	age: {
		type: Number,
		unique: true, 
		required: true
	},
	emailAddress: {
		type: String,
		required: true
	},
	hash: String,
	salt: String
});

User.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');//creating salf
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

}

User.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
}

User.methods.generateJwt = function(){//generating json web token
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		fullName: this.fullName,
		age: this.age,
		emailAddress: this.emailAddress,
		exp: parseInt(expiry.getTime() / 1000),
	}, process.env.PASSWORD);
}

mongoose.model('User', User);
// module.exports = { <-- long version
// 	User: User
// };
//module.exports = { User }; <--short version