'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    Project= mongoose.model('Project');

/**
 * Create a Project
 */
exports.create = function(req, res) {
	var project = new Project(req.body);

	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)

			});
		} else {
			res.status(201).json(project);
		}
	});
};

/**
 * Show the current Project
 */
exports.read = function(req, res) {
res.jsonp(req.project);
};

/**
 * Update a Project
 */
exports.update = function(req, res) {
	var project = req.project ;

	project = _.extend(project , req.body);

	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * Delete an Project
 */
exports.delete = function(req, res) {

};

/**
 * List of Projects
 */
exports.list = function(req, res) {
	Project.find().exec(function(err, projects) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(projects);
		}
	});
};


exports.projectByID = function(req, res, next, id) {
	Project.findOne({
		_id: id
	}).exec(function(err, project) {
		if (err) return next(err);
		if (!project) return next(new Error('Failed to load project ' + id));
		req.project = project;
		next();
	});
};