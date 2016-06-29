'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose=require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User= mongoose.model('User');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication.server.controller'),
	require('./users/users.authorization.server.controller'),
	require('./users/users.password.server.controller'),
	require('./users/users.profile.server.controller')
);

/*
module.exports.list=function(req,res){
		console.log('usao sam u list function');
		var user=new User();
		User.find().populate('firstName','lastName').exec(function(err, users1) {
		if (err) {
			console.log('gadgasdkjfasf');
			return res.status(400).send({

				blabla: 'bbb',
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users1);
		}
	});
};
*/