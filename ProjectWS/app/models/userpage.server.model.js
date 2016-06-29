'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Userpage Schema
 */
var UserpageSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Userpage name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Userpage', UserpageSchema);