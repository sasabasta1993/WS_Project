'use strict';

angular.module('pregleds').factory('Availableusers', ['$resource',
	function($resource) {
		// Availableusers service logic
		// ...

		// Public API
		return $resource('availableUsers/:userId',{userId: '@_id'},{
			update:{
				method : 'PUT'
			}
		});
	}
]);

