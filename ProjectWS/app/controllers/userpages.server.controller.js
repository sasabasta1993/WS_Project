'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Userpage = mongoose.model('Userpage'),
	_ = require('lodash');

/**
 * Create a Userpage
 */
exports.create = function(req, res) {
	var userpage = new Userpage(req.body);
	userpage.user = req.user;

	userpage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userpage);
		}
	});
};

/**
 * Show the current Userpage
 */
exports.read = function(req, res) {
	res.jsonp(req.userpage);
};

/**
 * Update a Userpage
 */
exports.update = function(req, res) {
	var userpage = req.userpage ;

	userpage = _.extend(userpage , req.body);

	userpage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userpage);
		}
	});
};

/**
 * Delete an Userpage
 */
exports.delete = function(req, res) {
	var userpage = req.userpage ;

	userpage.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userpage);
		}
	});
};

/**
 * List of Userpages
 */
exports.list = function(req, res) { 
	Userpage.find().sort('-created').populate('user', 'displayName').exec(function(err, userpages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userpages);
		}
	});
};

/**
 * Userpage middleware
 */
exports.userpageByID = function(req, res, next, id) { 
	Userpage.findById(id).populate('user', 'displayName').exec(function(err, userpage) {
		if (err) return next(err);
		if (! userpage) return next(new Error('Failed to load Userpage ' + id));
		req.userpage = userpage ;
		next();
	});
};

/**
 * Userpage authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.userpage.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
