'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pregleds = require('../../app/controllers/pregleds.server.controller');

	// Pregleds Routes
	app.route('/pregleds')
		.get(pregleds.list)
		.post(users.requiresLogin, pregleds.create);

	app.route('/pregleds/:pregledId')
		.get(pregleds.read)
		.put(users.requiresLogin, pregleds.hasAuthorization, pregleds.update)
		.delete(users.requiresLogin, pregleds.hasAuthorization, pregleds.delete);

	// Finish by binding the Pregled middleware
	app.param('pregledId', pregleds.pregledByID);
};
