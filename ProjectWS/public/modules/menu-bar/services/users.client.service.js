'use strict';

angular.module('menu-bar').factory('UsersOp', ['$resource',
	function($resource) {
		// Users service logic
		// ...

		// Public API
		return $resource('/users/:userId',{userId: '@_id'},
		{
			update: {
			method: 'PUT'
			}
		});
		
		}]);
	
