'use strict';

angular.module('task').factory('Tasksbyprojectid', ['$resource',
	function($resource) {
		// Tasksbyprojectid service logic
		// ...

		// Public API
	
		return $resource('task/:projectId', { projectId: '@taskForProject'},
		{
			update:{
				method: 'PUT'
			}
		});
		}
	
]);