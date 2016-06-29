'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Userpage = mongoose.model('Userpage'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, userpage;

/**
 * Userpage routes tests
 */
describe('Userpage CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Userpage
		user.save(function() {
			userpage = {
				name: 'Userpage Name'
			};

			done();
		});
	});

	it('should be able to save Userpage instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userpage
				agent.post('/userpages')
					.send(userpage)
					.expect(200)
					.end(function(userpageSaveErr, userpageSaveRes) {
						// Handle Userpage save error
						if (userpageSaveErr) done(userpageSaveErr);

						// Get a list of Userpages
						agent.get('/userpages')
							.end(function(userpagesGetErr, userpagesGetRes) {
								// Handle Userpage save error
								if (userpagesGetErr) done(userpagesGetErr);

								// Get Userpages list
								var userpages = userpagesGetRes.body;

								// Set assertions
								(userpages[0].user._id).should.equal(userId);
								(userpages[0].name).should.match('Userpage Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Userpage instance if not logged in', function(done) {
		agent.post('/userpages')
			.send(userpage)
			.expect(401)
			.end(function(userpageSaveErr, userpageSaveRes) {
				// Call the assertion callback
				done(userpageSaveErr);
			});
	});

	it('should not be able to save Userpage instance if no name is provided', function(done) {
		// Invalidate name field
		userpage.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userpage
				agent.post('/userpages')
					.send(userpage)
					.expect(400)
					.end(function(userpageSaveErr, userpageSaveRes) {
						// Set message assertion
						(userpageSaveRes.body.message).should.match('Please fill Userpage name');
						
						// Handle Userpage save error
						done(userpageSaveErr);
					});
			});
	});

	it('should be able to update Userpage instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userpage
				agent.post('/userpages')
					.send(userpage)
					.expect(200)
					.end(function(userpageSaveErr, userpageSaveRes) {
						// Handle Userpage save error
						if (userpageSaveErr) done(userpageSaveErr);

						// Update Userpage name
						userpage.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Userpage
						agent.put('/userpages/' + userpageSaveRes.body._id)
							.send(userpage)
							.expect(200)
							.end(function(userpageUpdateErr, userpageUpdateRes) {
								// Handle Userpage update error
								if (userpageUpdateErr) done(userpageUpdateErr);

								// Set assertions
								(userpageUpdateRes.body._id).should.equal(userpageSaveRes.body._id);
								(userpageUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Userpages if not signed in', function(done) {
		// Create new Userpage model instance
		var userpageObj = new Userpage(userpage);

		// Save the Userpage
		userpageObj.save(function() {
			// Request Userpages
			request(app).get('/userpages')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Userpage if not signed in', function(done) {
		// Create new Userpage model instance
		var userpageObj = new Userpage(userpage);

		// Save the Userpage
		userpageObj.save(function() {
			request(app).get('/userpages/' + userpageObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', userpage.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Userpage instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userpage
				agent.post('/userpages')
					.send(userpage)
					.expect(200)
					.end(function(userpageSaveErr, userpageSaveRes) {
						// Handle Userpage save error
						if (userpageSaveErr) done(userpageSaveErr);

						// Delete existing Userpage
						agent.delete('/userpages/' + userpageSaveRes.body._id)
							.send(userpage)
							.expect(200)
							.end(function(userpageDeleteErr, userpageDeleteRes) {
								// Handle Userpage error error
								if (userpageDeleteErr) done(userpageDeleteErr);

								// Set assertions
								(userpageDeleteRes.body._id).should.equal(userpageSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Userpage instance if not signed in', function(done) {
		// Set Userpage user 
		userpage.user = user;

		// Create new Userpage model instance
		var userpageObj = new Userpage(userpage);

		// Save the Userpage
		userpageObj.save(function() {
			// Try deleting Userpage
			request(app).delete('/userpages/' + userpageObj._id)
			.expect(401)
			.end(function(userpageDeleteErr, userpageDeleteRes) {
				// Set message assertion
				(userpageDeleteRes.body.message).should.match('User is not logged in');

				// Handle Userpage error error
				done(userpageDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Userpage.remove().exec();
		done();
	});
});