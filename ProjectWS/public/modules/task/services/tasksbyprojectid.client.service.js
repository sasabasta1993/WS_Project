'use strict';

angular.module('task').factory('Tasksbyprojectid', ['$resource',
	function($resource) {
		// Tasksbyprojectid service logic
		// ...

		// Public API
	
		return $resource('task/project/:projectId', { projectId: '@projectId'},
		{
			update:{
				method: 'PUT'
			}
		});
		}
	
]);