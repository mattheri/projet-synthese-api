const { API_URL } = require("./params");
const fs = require('fs/promises');
const axios = require('axios').default;
const students = require('./students');
const string = require('./string');

(async function () {
	const files = await fs.readdir(`./mock`);
	const urls = students.flatMap((student) => {
		return files.map(file => `${API_URL}/${student}/${file.replace('.mock.js', '')}/many`);
	});

	const mocks = await Promise.all(files.map(async (file) => ({ path: file.replace('.mock.js', ''), mock: await require(`./mock/${file}`)() })));

	const mocksWithUrl = urls.map(url => ({ url, mocks: mocks.find(mock => url.includes(mock.path)) }));

	mocksWithUrl.map(async ({ url, mocks }, index) => {
		setTimeout(async () => {
			console.log('url', url);

			await axios.post(url, { ...mocks.mock })
		}, index * 100);
	});
})();

