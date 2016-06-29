'use strict';

angular.module('users-page').factory('Taskbyusersid', ['$resource',
	function($resource) {
		// Taskbyusersid service logic
		// ...

		// Public API
		return $resource('task/:userId', {},
		{
			update:{
				method: 'PUT'
			}
		});
	}
]);