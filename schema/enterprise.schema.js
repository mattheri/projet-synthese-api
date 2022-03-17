const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	name: String,
	description: String,
	imageUrl: String,
	contactName: String,
	contactEmail: String,
	contactPhone: String,
	address: String,
	city: String,
	province: String,
	postalCode: String,
	published: Boolean,
	user: String,
});