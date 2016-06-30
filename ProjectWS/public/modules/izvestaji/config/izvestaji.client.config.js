'use strict';

// Izvestaji module config
angular.module('izvestaji').run(['Menus','Authentication',
	function(Menus,Authentication) {
		// Config logic
		// ...

				// Set top bar menu items
		var currentUser=Authentication.user;

		if(currentUser.hasOwnProperty('roles'))
		{
			if(currentUser.roles[0] === 'admin')
			{
		Menus.addMenuItem('topbar', 'Izvestaji', 'izvestaji', 'dropdown', '/');
		Menus.addSubMenuItem('topbar', 'izvestaji', 'Izvestaj 1', 'izvestaj1');
		
			}
		}
	}
]);