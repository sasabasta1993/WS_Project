'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    Comment= mongoose.model('Comment');

/**
 * Create a Comment
 */
 
exports.create = function(req, res) {
	var comment = new Comment(req.body);

	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)

			});
		} else {
			res.status(201).json(comment);
		}
	});
};

/**
 * Show the current Comment
 */
exports.read = function(req, res) {
res.jsonp(req.comment);
};

/**
 * Update a Comment
 */
exports.update = function(req, res) {
	var comment = req.comment ;

	comment = _.extend(comment , req.body);

	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comment);
		}
	});
};

/**
 * Delete an Comment
 */
exports.delete = function(req, res) {
	var comment = req.comment ;

	comment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comment);
		}
	});
};

/**
 * List of Comments
 */
exports.list = function(req, res) {
	Comment.find().exec(function(err, comments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comments);
		}
	});
};

exports.commentByID = function(req, res, next, id) {
	Comment.findOne({
		_id: id
	}).exec(function(err, comment) {
		if (err) return next(err);
		if (!comment) return next(new Error('Failed to load comment ' + id));
		req.comment = comment;
		next();
	});
};