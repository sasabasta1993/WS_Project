'use strict';

//Setting up route
angular.module('users-page').config(['$stateProvider',
	function($stateProvider) {
		// Users page state routing
		$stateProvider.
		state('create-task-user', {
			url: '/create-task-user',
			templateUrl: 'modules/users-page/views/create-task-user.client.view.html'
		}).
		state('dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/users-page/views/dashboard.client.view.html'
		});
	}
]);