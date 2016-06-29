'use strict';

angular.module('users-page').factory('Tasksbyauthorsid', ['$resource',
	function($resource) {
		// Tasksbyauthorsid service logic
		// ...

		// Public API
		return $resource('/taskAuthorId/:userId', {},
		{
			update:{
				method: 'PUT'
			}
		});
	}
]);