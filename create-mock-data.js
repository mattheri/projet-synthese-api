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

	await Promise.all(mocksWithUrl.map(async ({ url, mocks }, index) => {
		setTimeout(async () => {
			console.log('url', url);

			await axios.post(url, { [string.camelCase(mocks.path)]: mocks.mock })
		}, index * 100);
	}));

	// const schemaLinkedToOtherDocuments = [
	// 	{ schema: `${API_URL}/:studentId/internship-offer/:id`, linkedTo: `${API_URL}/:studentId/enterprise`, key: "enterprise" },
	// 	{ schema: `${API_URL}/:studentId/internship-request/:id`, linkedTo: `${API_URL}/:studentId/candidate`, key: "student" }
	// ];

	// const requestToLinkToOtherDocuments = flagIndex >= 0 && studentId ? schemaLinkedToOtherDocuments.map(({ schema, linkedTo, key }) => {
	// 	return { url: schema.replace(':studentId', studentId), linkDocumentUrl: linkedTo.replace(':studentId', studentId), key };
	// }) : students.flatMap(student => schemaLinkedToOtherDocuments.map(({ schema, linkedTo, key }) => {
	// 	return { url: schema.replace(':studentId', student), linkDocumentUrl: linkedTo.replace(':studentId', student), key };
	// }));

	// requestToLinkToOtherDocuments.map(({ url, linkDocumentUrl, key }, index) => {
	// 	setTimeout(async () => {
	// 		const { data } = await axios.get(url.replace('/:id', ''));
	// 		const { data: linkedDocuments } = await axios.get(linkDocumentUrl);

	// 		const documents = data.map(async (document) => {
	// 			const index = Math.random() * (linkedDocuments.length - 1);
	// 			const linkedDocument = linkedDocuments[Math.floor(index)];
	// 			const { data } = await axios.put(url.replace(':id', document._id), { [key]: linkedDocument._id });
	// 			return data;
	// 		})

	// 		await Promise.all(documents);
	// 	}, index * 1000);
	// });
})();
