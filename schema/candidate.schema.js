const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	name: String,
	description: String,
	jobTitle: String,
	email: String,
	phone: String,
	address: String,
	city: String,
	province: String,
	postalCode: String,
	published: Boolean,
	user: String,
});