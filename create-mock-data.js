const { API_URL } = require("./params");
const fs = require('fs/promises');
const axios = require('axios').default;
const students = require('./students');
const string = require('./string');

(async function createMockData() {
	const FLAG = "--s";
	const flagIndex = process.argv.indexOf(FLAG);
	const studentId = flagIndex >= 0 && process.argv[flagIndex + 1];

	const files = await fs.readdir(`./mock`);
	const urls = flagIndex >= 0 && studentId ? files.map(file => `${API_URL}/${studentId}/${file.replace('.mock.js', '')}/many`) : students.flatMap((student) => {
		return files.map(file => `${API_URL}/${student}/${file.replace('.mock.js', '')}/many`);
	});

	const mocks = await Promise.all(files.map(async (file) => ({ path: file.replace('.mock.js', ''), mock: await require(`./mock/${file}`)() })));

	const mocksWithUrl = urls.map(url => ({ url, mocks: mocks.find(mock => url.includes(mock.path)) }));

	mocksWithUrl.map(async ({ url, mocks }, index) => {
		setTimeout(async () => {
			console.log('url', url);

			await axios.post(url, { [string.camelCase(mocks.path)]: mocks.mock })
		}, index * 100);
	});
})();
