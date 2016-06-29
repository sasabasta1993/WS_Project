'use strict';

// Configuring the Articles module
angular.module('pregleds').run(['Menus','Authentication',
	function(Menus,Authentication) {
		// Set top bar menu items

		var currentUser=Authentication.user;

		if(currentUser.hasOwnProperty('roles'))
		{
			if(currentUser.roles[0] ==='admin')
			{
			Menus.addMenuItem('topbar', 'Pregled', 'pregleds', 'dropdown', '/pregleds(/create)?');
			Menus.addSubMenuItem('topbar', 'pregleds', 'Pregled projekata', 'pregled-projekata');
		//Menus.addSubMenuItem('topbar', 'pregleds', 'Pregled zadataka', 'pregleds/create');
		//Menus.addSubMenuItem('topbar', 'pregleds', 'Pregled tima', 'pregleds/view');
			}
		}
	}
]);