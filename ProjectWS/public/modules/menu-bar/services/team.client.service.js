'use strict';

angular.module('menu-bar').factory('TeamOp', ['$resource',
	function($resource) {
		// Team service logic
		// ...

		// Public API
		return $resource('team/:teamId', { teamId: '@_id'}, 
		{
			update: {
				method: 'PUT'
			}
		});

	}
]);


