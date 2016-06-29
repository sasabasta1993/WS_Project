'use strict';

angular.module('task').factory('UserTasks', ['$resource',
	function($resource) {
		// User tasks service logic
		// ...

		// Public API
		return $resource('user/:userId', { userId: '@_id'},
		{
			update:{
				method: 'PUT'
			}
		});
		}
	
]);