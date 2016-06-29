'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
		var project = require('../../app/controllers/project.server.controller');

		app.route('/project')
		.post(project.create)
		.get(project.list);

		app.route('/project/:projectId')
		.put(project.update)
		.post(project.create)
		.get(project.read);

		app.param('projectId', project.projectByID);
};