'use strict';

// Task module config
angular.module('task').run(['Menus','Authentication',
	function(Menus,Authentication) {
		// Config logic
		// ...
		var currentUser=Authentication.user;

		// Set top bar menu items
		if(currentUser.hasOwnProperty('roles'))
		{
			if(currentUser.roles[0] === 'admin'){
			Menus.addMenuItem('topbar', 'Zadatak', 'zadatak', 'dropdown', '/');
			Menus.addSubMenuItem('topbar', 'zadatak', 'Kreiraj zadatak', 'create-task');
			Menus.addSubMenuItem('topbar', 'zadatak', 'Pregled zadataka', 'view-tasks');
			}
		}

	}
]);