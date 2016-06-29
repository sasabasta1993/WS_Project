'use strict';

angular.module('menu-bar').factory('ProjectOp', ['$resource',
	function($resource) {
		// Project service logic
		// ...

		// Public API
		return $resource('/project/:projectId', { projectId: '@_id'}, 
		{
			update: {
				method: 'PUT'
			}
		});
		}]);



