'use strict';

//Pregleds service used to communicate Pregleds REST endpoints
angular.module('pregleds').factory('Pregleds', ['$resource',
	function($resource) {
		return $resource('pregleds/:pregledId', { pregledId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);