'use strict';

//Setting up route
angular.module('izvestaji').config(['$stateProvider',
	function($stateProvider) {
		// Izvestaji state routing
		$stateProvider.
		state('izvestaj1', {
			url: '/izvestaj1',
			templateUrl: 'modules/izvestaji/views/izvestaj1.client.view.html'
		});
	}
]);