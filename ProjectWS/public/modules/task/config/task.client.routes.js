'use strict';

//Setting up route
angular.module('task').config(['$stateProvider',
	function($stateProvider) {
		// Task state routing
		$stateProvider.
		state('view-tasks', {
			url: '/view-tasks',
			templateUrl: 'modules/task/views/view-tasks.client.view.html'
		}).
		state('create-task', {
			url: '/create-task',
			templateUrl: 'modules/task/views/create-task.client.view.html'
		}).
		state('task', {
			url: '/task',
			templateUrl: 'modules/task/views/task.client.view.html'
		});
	}
]);