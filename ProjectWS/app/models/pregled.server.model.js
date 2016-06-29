'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pregled Schema
 */
var PregledSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Pregled name',
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

mongoose.model('Pregled', PregledSchema);