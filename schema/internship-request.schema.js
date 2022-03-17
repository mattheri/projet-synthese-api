const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	title: String,
	studentName: String,
	studentPresentation: String,
	school: String,
	startDate: Date,
	endDate: Date,
	program: String,
	stageType: String,
	hoursPerWeek: Number,
	additionalInfo: String,
	skills: [String],
	published: Boolean,
	paid: [String],
	user: String,
	active: Boolean,
	region: String,
	activitySector: String,
	city: String,
	linkToResume: String,
});