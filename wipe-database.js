const fs = require('fs/promises');
const string = require('./string');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

(async function () {
	const URI = `mongodb+srv://${process.env.DB_ADMIN_USER}:${process.env.DB_ADMIN_PASSWORD}@projet-synthese.cy5wt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
	const connection = mongoose.createConnection(URI);
	const files = await fs.readdir(`./mock`);

	const normalizedFileNames = files.map(file => string.normalize(file.replace('.mock.js', '')));

	const isEnd = await Promise.all(normalizedFileNames.map(async (file) => {
		console.log(`Dropping collection: ${file}`);

		const dropStatus = await connection.dropCollection(file);

		if (dropStatus) console.log(`Collection ${file} dropped`);
		else console.log(`Collection ${file} not dropped`);
	}));

	connection.close();
	if (isEnd.every(Boolean)) {
		console.log('All collections dropped');

		process.exit(0);
	}

	process.exit(1);
})();