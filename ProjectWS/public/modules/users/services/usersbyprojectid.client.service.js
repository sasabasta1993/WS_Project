'use strict';

angular.module('users').factory('Usersbyprojectid', ['$resource',
	function($resource) {
		// Usersbyprojectid service logic
		// ...

		// Public API
		return $resource('/users/:projectId',{projectId:'@projectId'},{
			update: {
				method : 'PUT'
			}
		});
	}
]);