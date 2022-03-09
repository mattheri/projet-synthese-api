const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	title: String,
	description: String,
	enterprise: String,
	startDate: Date,
	endDate: Date,
	program: String,
	requirements: String,
	stageType: String,
	hoursPerWeek: Number,
	additionalInfo: String,
	paid: [String],
	skills: [String],
	published: Boolean,
	user: String,
	updatedAt: Date,
	active: Boolean,
});