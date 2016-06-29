'use strict';

// Users page module config
angular.module('users-page').run(['Menus','Authentication',
	function(Menus,Authentication) {
		// Config logic
		// ...

		var currentUser=Authentication.user;

		// Set top bar menu items
		
		if(currentUser.hasOwnProperty('roles'))
		{
			if(currentUser.roles[0] === 'user'){
			console.log('prosao');
			Menus.addMenuItem('topbar', 'Zadatak', 'zadatak', 'dropdown', 'dashboard');
			Menus.addSubMenuItem('topbar', 'zadatak', 'Kreiraj zadatak', 'create-task-user');
			Menus.addSubMenuItem('topbar', 'zadatak', 'Pregled zadataka', 'dashboard');
			}
		}
	}
]);