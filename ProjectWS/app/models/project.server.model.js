'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
	// Project model fields   
	// ...
	name:{
		type:String,
		trim:true
	},
	projectAdmin: {
			type: Schema.ObjectId,
			ref : 'User'
	},
	projectUsers:[{
		
		_id:{
			type: Schema.ObjectId,
			ref : 'User'
		} 
	}],

	projectTasks:[{
		_id :{
			type: Schema.ObjectId,
			ref : 'Tasks'

			}
	}]

});

mongoose.model('Project', ProjectSchema);