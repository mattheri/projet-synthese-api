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
	skills: [String],
	published: Boolean,
	paid: [String],
	user: String,
	updatedAt: Date,
});