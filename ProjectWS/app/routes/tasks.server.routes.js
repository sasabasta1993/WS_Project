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

		app.route('/task/:userId')
        .get(task.searchTaskByUserId);

		app.route('/task/:projectId')
        .get(task.searchByProject);

        app.route('/taskAuthorId/:userId')
        .get(task.searchTaskByAuthorId);


		app.param('taskId', task.taskByID);
};