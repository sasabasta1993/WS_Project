'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var userpages = require('../../app/controllers/userpages.server.controller');

	// Userpages Routes


	app.route('/userpages/:userpageId')
		.get(userpages.read)
		.put(users.requiresLogin, userpages.hasAuthorization, userpages.update)
		.delete(users.requiresLogin, userpages.hasAuthorization, userpages.delete);

	// Finish by binding the Userpage middleware
	app.param('userpageId', userpages.userpageByID);
};
