'use strict';

angular.module('task').factory('Commentslist', ['$resource',
	function($resource) {
		// Commentslist service logic
		// ...

		// Public API
		return $resource('/comment', {},
		{
		update:{
				method: 'PUT'
			}
		});
	}
]);