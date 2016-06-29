'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    Team= mongoose.model('Team');

/**
 * Create a Team
 */
exports.create = function(req, res) {
	var team = new Team(req.body);

	team.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err),
				message1: err

			});
		} else {
			res.status(201).json(team);
		}
	});
};

/**
 * Show the current Team
 */
exports.read = function(req, res) {
res.jsonp(req.team);
};

/**
 * Update a Team
 */
exports.update = function(req, res) {

};

/**
 * Delete an Team
 */
exports.delete = function(req, res) {

};

/**
 * List of Teams
 */
exports.list = function(req, res) {
	Team.find().exec(function(err, teams) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teams);
		}
	});
};

exports.teamByID = function(req, res, next, id) {
	Team.findOne({
		_id: id
	}).exec(function(err, team) {
		if (err) return next(err);
		if (!team) return next(new Error('Failed to load team ' + id));
		req.team = team;
		next();
	});
};