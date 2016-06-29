'use strict';

(function() {
	// Userpages Controller Spec
	describe('Userpages Controller Tests', function() {
		// Initialize global variables
		var UserpagesController,
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

			// Initialize the Userpages controller.
			UserpagesController = $controller('UserpagesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Userpage object fetched from XHR', inject(function(Userpages) {
			// Create sample Userpage using the Userpages service
			var sampleUserpage = new Userpages({
				name: 'New Userpage'
			});

			// Create a sample Userpages array that includes the new Userpage
			var sampleUserpages = [sampleUserpage];

			// Set GET response
			$httpBackend.expectGET('userpages').respond(sampleUserpages);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.userpages).toEqualData(sampleUserpages);
		}));

		it('$scope.findOne() should create an array with one Userpage object fetched from XHR using a userpageId URL parameter', inject(function(Userpages) {
			// Define a sample Userpage object
			var sampleUserpage = new Userpages({
				name: 'New Userpage'
			});

			// Set the URL parameter
			$stateParams.userpageId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/userpages\/([0-9a-fA-F]{24})$/).respond(sampleUserpage);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.userpage).toEqualData(sampleUserpage);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Userpages) {
			// Create a sample Userpage object
			var sampleUserpagePostData = new Userpages({
				name: 'New Userpage'
			});

			// Create a sample Userpage response
			var sampleUserpageResponse = new Userpages({
				_id: '525cf20451979dea2c000001',
				name: 'New Userpage'
			});

			// Fixture mock form input values
			scope.name = 'New Userpage';

			// Set POST response
			$httpBackend.expectPOST('userpages', sampleUserpagePostData).respond(sampleUserpageResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Userpage was created
			expect($location.path()).toBe('/userpages/' + sampleUserpageResponse._id);
		}));

		it('$scope.update() should update a valid Userpage', inject(function(Userpages) {
			// Define a sample Userpage put data
			var sampleUserpagePutData = new Userpages({
				_id: '525cf20451979dea2c000001',
				name: 'New Userpage'
			});

			// Mock Userpage in scope
			scope.userpage = sampleUserpagePutData;

			// Set PUT response
			$httpBackend.expectPUT(/userpages\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/userpages/' + sampleUserpagePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid userpageId and remove the Userpage from the scope', inject(function(Userpages) {
			// Create new Userpage object
			var sampleUserpage = new Userpages({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Userpages array and include the Userpage
			scope.userpages = [sampleUserpage];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/userpages\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUserpage);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.userpages.length).toBe(0);
		}));
	});
}());