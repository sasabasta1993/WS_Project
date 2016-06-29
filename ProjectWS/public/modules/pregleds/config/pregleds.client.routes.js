'use strict';

//Setting up route
angular.module('pregleds').config(['$stateProvider',
	function($stateProvider) {
		// Pregleds state routing
		$stateProvider.
		state('pregled-timova', {
			url: '/pregled-timova',
			templateUrl: 'modules/pregleds/views/pregled-timova.client.view.html'
		}).
		state('pregled-projekata', {
			url: '/pregled-projekata',
			templateUrl: 'modules/pregleds/views/pregled-projekata.client.view.html'
		}).
		state('listPregleds', {
			url: '/pregleds',
			templateUrl: 'modules/pregleds/views/list-pregleds.client.view.html'
		}).
		state('createPregled', {
			url: '/pregleds/create',
			templateUrl: 'modules/pregleds/views/create-pregled.client.view.html'
		}).
		state('viewPregled', {
			url: '/pregleds/:pregledId',
			templateUrl: 'modules/pregleds/views/view-pregled.client.view.html'
		}).
		state('editPregled', {
			url: '/pregleds/:pregledId/edit',
			templateUrl: 'modules/pregleds/views/edit-pregled.client.view.html'
		});
	}
]);