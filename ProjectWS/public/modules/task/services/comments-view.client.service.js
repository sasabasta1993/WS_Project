'use strict';

angular.module('task').factory('CommentsView', ['$resource',
	function($resource) {
		// Comments view service logic
		// ...

		// Public API
		return $resource('comment/:commentId', { commentId: '@_id'},
		{
			update:{
				method: 'PUT'
			},

			delete:{
				method : 'DELETE'
			}
		});
	}
]);