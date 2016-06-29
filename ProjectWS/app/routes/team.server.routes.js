'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
		var team = require('../../app/controllers/team.server.controller');

		app.route('/team')
		.post(team.create)
		.get(team.list);

		app.route('/team/:teamId')
		.get(team.read);

	


		app.param('teamId', team.teamByID);
};