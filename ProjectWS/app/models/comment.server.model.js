'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	// Comment model fields   
	// ...
	authorName:{
		type : String,
		trim : true
	},
	author: {
		type: Schema.ObjectId,
		ref : 'User'
	},
	text  :{
		type: String,
		trim: true,
		required: 'Please fill text of comment',
	},
	date :{
		type : Date,
		default : Date.now
	},
	relatedTask:{
		type: Schema.ObjectId,
		ref : 'Tasks'
	}
});

mongoose.model('Comment', CommentSchema);