'use strict';

//Setting up route
angular.module('menu-bar').config(['$stateProvider',
	function($stateProvider) {
		// Menu bar state routing
		$stateProvider.
		state('create-project', {
			url: '/create-project',
			templateUrl: 'modules/menu-bar/views/create-project.client.view.html'
		}).
		state('create-team', {
			url: '/create-team',
			templateUrl: 'modules/menu-bar/views/create-team.client.view.html'
		});

	}
]);