'use strict';

angular.module('users-page').factory('Tasksbyauthorsid', ['$resource',
	function($resource) {
		// Tasksbyauthorsid service logic
		// ...

		// Public API
		return $resource('/taskAuthorId/user/:userId', {userId : '@userId'},
		{
			update:{
				method: 'PUT'
			}
		});
	}
]);