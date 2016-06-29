'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Pregled = mongoose.model('Pregled'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, pregled;

/**
 * Pregled routes tests
 */
describe('Pregled CRUD tests', function() {
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

		// Save a user to the test db and create new Pregled
		user.save(function() {
			pregled = {
				name: 'Pregled Name'
			};

			done();
		});
	});

	it('should be able to save Pregled instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pregled
				agent.post('/pregleds')
					.send(pregled)
					.expect(200)
					.end(function(pregledSaveErr, pregledSaveRes) {
						// Handle Pregled save error
						if (pregledSaveErr) done(pregledSaveErr);

						// Get a list of Pregleds
						agent.get('/pregleds')
							.end(function(pregledsGetErr, pregledsGetRes) {
								// Handle Pregled save error
								if (pregledsGetErr) done(pregledsGetErr);

								// Get Pregleds list
								var pregleds = pregledsGetRes.body;

								// Set assertions
								(pregleds[0].user._id).should.equal(userId);
								(pregleds[0].name).should.match('Pregled Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Pregled instance if not logged in', function(done) {
		agent.post('/pregleds')
			.send(pregled)
			.expect(401)
			.end(function(pregledSaveErr, pregledSaveRes) {
				// Call the assertion callback
				done(pregledSaveErr);
			});
	});

	it('should not be able to save Pregled instance if no name is provided', function(done) {
		// Invalidate name field
		pregled.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pregled
				agent.post('/pregleds')
					.send(pregled)
					.expect(400)
					.end(function(pregledSaveErr, pregledSaveRes) {
						// Set message assertion
						(pregledSaveRes.body.message).should.match('Please fill Pregled name');
						
						// Handle Pregled save error
						done(pregledSaveErr);
					});
			});
	});

	it('should be able to update Pregled instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pregled
				agent.post('/pregleds')
					.send(pregled)
					.expect(200)
					.end(function(pregledSaveErr, pregledSaveRes) {
						// Handle Pregled save error
						if (pregledSaveErr) done(pregledSaveErr);

						// Update Pregled name
						pregled.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Pregled
						agent.put('/pregleds/' + pregledSaveRes.body._id)
							.send(pregled)
							.expect(200)
							.end(function(pregledUpdateErr, pregledUpdateRes) {
								// Handle Pregled update error
								if (pregledUpdateErr) done(pregledUpdateErr);

								// Set assertions
								(pregledUpdateRes.body._id).should.equal(pregledSaveRes.body._id);
								(pregledUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pregleds if not signed in', function(done) {
		// Create new Pregled model instance
		var pregledObj = new Pregled(pregled);

		// Save the Pregled
		pregledObj.save(function() {
			// Request Pregleds
			request(app).get('/pregleds')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Pregled if not signed in', function(done) {
		// Create new Pregled model instance
		var pregledObj = new Pregled(pregled);

		// Save the Pregled
		pregledObj.save(function() {
			request(app).get('/pregleds/' + pregledObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', pregled.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Pregled instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Pregled
				agent.post('/pregleds')
					.send(pregled)
					.expect(200)
					.end(function(pregledSaveErr, pregledSaveRes) {
						// Handle Pregled save error
						if (pregledSaveErr) done(pregledSaveErr);

						// Delete existing Pregled
						agent.delete('/pregleds/' + pregledSaveRes.body._id)
							.send(pregled)
							.expect(200)
							.end(function(pregledDeleteErr, pregledDeleteRes) {
								// Handle Pregled error error
								if (pregledDeleteErr) done(pregledDeleteErr);

								// Set assertions
								(pregledDeleteRes.body._id).should.equal(pregledSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Pregled instance if not signed in', function(done) {
		// Set Pregled user 
		pregled.user = user;

		// Create new Pregled model instance
		var pregledObj = new Pregled(pregled);

		// Save the Pregled
		pregledObj.save(function() {
			// Try deleting Pregled
			request(app).delete('/pregleds/' + pregledObj._id)
			.expect(401)
			.end(function(pregledDeleteErr, pregledDeleteRes) {
				// Set message assertion
				(pregledDeleteRes.body.message).should.match('User is not logged in');

				// Handle Pregled error error
				done(pregledDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Pregled.remove().exec();
		done();
	});
});