const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	title: String,
	user: String,
	updatedAt: Date,
});