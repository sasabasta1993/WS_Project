'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Admin Schema
 */
var AdminSchema = new Schema({
	// Admin model fields   
	// ...
});

mongoose.model('Admin', AdminSchema);