'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Pregled = mongoose.model('Pregled'),
	_ = require('lodash');

/**
 * Create a Pregled
 */
exports.create = function(req, res) {
	var pregled = new Pregled(req.body);
	pregled.user = req.user;

	pregled.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pregled);
		}
	});
};

/**
 * Show the current Pregled
 */
exports.read = function(req, res) {
	res.jsonp(req.pregled);
};

/**
 * Update a Pregled
 */
exports.update = function(req, res) {
	var pregled = req.pregled ;

	pregled = _.extend(pregled , req.body);

	pregled.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pregled);
		}
	});
};

/**
 * Delete an Pregled
 */
exports.delete = function(req, res) {
	var pregled = req.pregled ;

	pregled.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pregled);
		}
	});
};

/**
 * List of Pregleds
 */
exports.list = function(req, res) { 
	Pregled.find().sort('-created').populate('user', 'displayName').exec(function(err, pregleds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pregleds);
		}
	});
};

/**
 * Pregled middleware
 */
exports.pregledByID = function(req, res, next, id) { 
	Pregled.findById(id).populate('user', 'displayName').exec(function(err, pregled) {
		if (err) return next(err);
		if (! pregled) return next(new Error('Failed to load Pregled ' + id));
		req.pregled = pregled ;
		next();
	});
};

/**
 * Pregled authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pregled.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
