'use strict';

// Pregleds controller
angular.module('pregleds').controller('PregledsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pregleds',
	function($scope, $stateParams, $location, Authentication, Pregleds) {
		$scope.authentication = Authentication;

		// Create new Pregled
		$scope.create = function() {
			// Create new Pregled object
			var pregled = new Pregleds ({
				name: this.name
			});

			// Redirect after save
			pregled.$save(function(response) {
				$location.path('pregleds/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pregled
		$scope.remove = function(pregled) {
			if ( pregled ) { 
				pregled.$remove();

				for (var i in $scope.pregleds) {
					if ($scope.pregleds [i] === pregled) {
						$scope.pregleds.splice(i, 1);
					}
				}
			} else {
				$scope.pregled.$remove(function() {
					$location.path('pregleds');
				});
			}
		};

		// Update existing Pregled
		$scope.update = function() {
			var pregled = $scope.pregled;

			pregled.$update(function() {
				$location.path('pregleds/' + pregled._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pregleds
		$scope.find = function() {
			$scope.pregleds = Pregleds.query();
		};

		// Find existing Pregled
		$scope.findOne = function() {
			$scope.pregled = Pregleds.get({ 
				pregledId: $stateParams.pregledId
			});
		};
	}
]);