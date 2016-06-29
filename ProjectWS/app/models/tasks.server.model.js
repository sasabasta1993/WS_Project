'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tasks Schema
 */
var TasksSchema = new Schema({
	// Tasks model fields   
	// ...
	name: {
		type: String,
		default: '',
		required: 'Please fill name of task',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill description of project',
		trim: true
	},
	createdByUser: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	kreiraoName:{
		type: String,
		trim: true
	},
	kreiranoZaName:{
		type : String,
		trim : true
	},
	createdForUser:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	taskForProject:{
		type: Schema.ObjectId,
		ref : 'Project'
	},
	comments:[{author:{ type:Schema.ObjectId, ref: 'User'},content: String,date:{ type: Date,default : Date.now }}],
	priority: { 
		type: String,
		enum: ['Blocker','Critical','Major','Minor','Trivial']
	},
	status:{
		type:String,
		enum: ['To Do','In Progress','Verify','Done'],
		default : 'To Do'
	}


});

mongoose.model('Tasks', TasksSchema);