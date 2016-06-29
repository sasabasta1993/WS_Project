'use strict';

angular.module('task').factory('DeleteTask', ['$resource',
	function($resource) {
		// Delete task service logic
		// ...

		// Public API
		return $resource('task/:taskId', { taskId: '@_id'},
		{
			delete:{
				method: 'DELETE'
			}
		});
	}
]);