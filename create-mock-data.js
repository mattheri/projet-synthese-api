const fs = require('fs');
const axios = require('axios').default;
const students = require('./students');
const string = require('./string');

// get all the mock files
fs.readdirSync('./mock').map(file => {
	students.map(student => {
		let timeoutThreshold = 0;
		const filePath = `${__dirname}/mock/${file}`;
		const fileExists = fs.existsSync(filePath);

		if (!fileExists) {
			throw new Error(`File ${filePath} does not exist.`);
		}

		require(filePath)().then(mocks => {
			const path = file.replace('.mock.js', '');
			const url = process.env.API_URL ? `${process.env.API_URL}/api/${student}/${path}` : `http://localhost:3000/api/${student}/${path}`;

			for (let i = 0; i < mocks.length; i++) {
				const mock = mocks[i];

				setTimeout(() => {
					axios.post(url, { [string.camelCase(path)]: mock })
						.catch(err => {
							console.log(err);
						}).then(() => {
							timeoutThreshold = 1000 * i;
						});
				}, timeoutThreshold);
			}
		});
	})
});

