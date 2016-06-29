'use strict';

// Menu bar module config
angular.module('menu-bar').run(['Menus','Authentication',
	function(Menus,Authentication) {
		// Config logic
		// ...
				// Set top bar menu items
		var currentUser=Authentication.user;

		if(currentUser.hasOwnProperty('roles'))
		{
			if(currentUser.roles[0] === 'admin')
			{
			Menus.addMenuItem('topbar', 'Projekat', 'menu-bar', 'dropdown', '/');

			Menus.addSubMenuItem('topbar', 'menu-bar', 'Kreiraj projekat', 'create-project');
			Menus.addSubMenuItem('topbar', 'menu-bar', 'Kreiraj tim', 'create-team');
			}
		}


	}
]);