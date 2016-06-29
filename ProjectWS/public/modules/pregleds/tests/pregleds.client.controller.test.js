'use strict';

(function() {
	// Pregleds Controller Spec
	describe('Pregleds Controller Tests', function() {
		// Initialize global variables
		var PregledsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Pregleds controller.
			PregledsController = $controller('PregledsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pregled object fetched from XHR', inject(function(Pregleds) {
			// Create sample Pregled using the Pregleds service
			var samplePregled = new Pregleds({
				name: 'New Pregled'
			});

			// Create a sample Pregleds array that includes the new Pregled
			var samplePregleds = [samplePregled];

			// Set GET response
			$httpBackend.expectGET('pregleds').respond(samplePregleds);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pregleds).toEqualData(samplePregleds);
		}));

		it('$scope.findOne() should create an array with one Pregled object fetched from XHR using a pregledId URL parameter', inject(function(Pregleds) {
			// Define a sample Pregled object
			var samplePregled = new Pregleds({
				name: 'New Pregled'
			});

			// Set the URL parameter
			$stateParams.pregledId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pregleds\/([0-9a-fA-F]{24})$/).respond(samplePregled);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pregled).toEqualData(samplePregled);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pregleds) {
			// Create a sample Pregled object
			var samplePregledPostData = new Pregleds({
				name: 'New Pregled'
			});

			// Create a sample Pregled response
			var samplePregledResponse = new Pregleds({
				_id: '525cf20451979dea2c000001',
				name: 'New Pregled'
			});

			// Fixture mock form input values
			scope.name = 'New Pregled';

			// Set POST response
			$httpBackend.expectPOST('pregleds', samplePregledPostData).respond(samplePregledResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pregled was created
			expect($location.path()).toBe('/pregleds/' + samplePregledResponse._id);
		}));

		it('$scope.update() should update a valid Pregled', inject(function(Pregleds) {
			// Define a sample Pregled put data
			var samplePregledPutData = new Pregleds({
				_id: '525cf20451979dea2c000001',
				name: 'New Pregled'
			});

			// Mock Pregled in scope
			scope.pregled = samplePregledPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pregleds\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pregleds/' + samplePregledPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pregledId and remove the Pregled from the scope', inject(function(Pregleds) {
			// Create new Pregled object
			var samplePregled = new Pregleds({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pregleds array and include the Pregled
			scope.pregleds = [samplePregled];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pregleds\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePregled);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pregleds.length).toBe(0);
		}));
	});
}());