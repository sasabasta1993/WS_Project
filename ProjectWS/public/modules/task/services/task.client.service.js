'use strict';

angular.module('task').factory('TaskOp', ['$resource',
	function($resource) {
		// Task service logic
		// ...

		// Public API
		return $resource('task/:taskId', { taskId: '@_id'},
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

