'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var comment = require('../../app/controllers/comment.server.controller');

	app.route('/comment')
	.get(comment.list)
	.post(comment.create);

	app.route('/comment/:commentId')
	.get(comment.list)
	.put(comment.update)
	.delete(comment.delete);

	app.param('commentId', comment.commentByID);
};