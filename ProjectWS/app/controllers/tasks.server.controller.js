'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    Task= mongoose.model('Tasks');

/**
 * Create a Task
 */
exports.create = function(req, res) {
	var task = new Task(req.body);

	task.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err),
				message1: err

			});
		} else {
			res.status(201).json(task);
		}
	});
};

/**
 * Show the current Task
 */
exports.read = function(req, res) {
res.jsonp(req.task);
};

/**
 * Update a Task
 */
exports.update = function(req, res) {
	var task = req.task ;

	task = _.extend(task , req.body);

	task.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(task);
		}
	});
};

/**
*Query tasks by project Id
*/
exports.searchByProject=function(req,res){

if( req.params.projectId){
        Task.find({taskForProject: req.params.projectId }, function(err, tasks){
            console.log(req.params.genre);
            res.json(tasks);
        });
    }

};


exports.searchTaskByUserId=function(req,res){
if(req.params.userId){
	Task.find({createdForUser : req.params.userId},function(err,tasks){

		res.json(tasks);
	});
}
};


exports.searchTaskByAuthorId=function(req,res){
if(req.params.userId){
	Task.find({createdByUser : req.params.userId},function(err,tasks){

		res.json(tasks);
	});
}
};

/**
 * Delete an Task
 */
exports.delete = function(req, res) {
	var task = req.task ;

	task.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(task);
		}
	});

};

/**
 * List of Tasks
 */
exports.list = function(req, res) {
	Task.find().exec(function(err, tasks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tasks);
		}
	});
};


/**
* Find task by Id
*/
exports.taskByID = function(req, res, next, id) {
	Task.findOne({
		_id: id
	}).exec(function(err, task) {
		if (err) return next(err);
		if (!task) return next(new Error('Failed to load task ' + id));
		req.task = task;
		next();
	});
};