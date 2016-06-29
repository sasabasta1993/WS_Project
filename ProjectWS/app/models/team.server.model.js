'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
	// Team model fields   
	// ...
	name : {
		type : String,
		trim : true,
		required: 'Please fill name of team',
	},
	teamAdmin: {
		type: Schema.ObjectId,
		ref : 'User'
	},
	members :[ {
		type: Schema.ObjectId,
		ref : 'User'
	}]

});

mongoose.model('Team', TeamSchema);


