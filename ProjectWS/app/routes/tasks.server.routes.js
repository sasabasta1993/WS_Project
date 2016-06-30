'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	
	var task = require('../../app/controllers/tasks.server.controller');

		app.route('/task')
		.post(task.create)
		.get(task.list);

		app.route('/task/:taskId')
		.put(task.update)
		.delete(task.delete);

		app.route('/task/project/:projectId')
        .get(task.searchByProject);

		app.route('/task/user/:userId')
        .get(task.searchTaskByUserId);

		app.route('/taskAuthorId/user/:userId')
        .get(task.searchTaskByAuthorId);






		app.param('taskId', task.taskByID);
};