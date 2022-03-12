const { DB_NAME } = require("./params");
const mongoose = require('mongoose');

function connect({ username, password }) {
	const connectionUrl = `mongodb+srv://${username}:${password}@projet-synthese.cy5wt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

	return new Promise((resolve, reject) => {
		if (mongoose.connection.readyState === 0) {
			mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve(`Connected to ${connectionUrl} with user: ${username}`);
				}
			});
		} else {
			resolve(`Already connected to ${connectionUrl}`);
		}
	});
}

module.exports = connect;