const mongoose = require('mongoose');

function connect({ username, password }) {
	const connectionUrl = "mongodb+srv://username:password@projet-synthese.cy5wt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority".replace('username', username).replace('password', password);

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