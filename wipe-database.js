const fs = require('fs/promises');
const axios = require('axios').default;
const students = require('./students');

(async function () {
	const files = await fs.readdir(`./mock`);
	const urls = students.flatMap((student) => {

		const urls = files.map(file => process.env.API_URL ? `${process.env.API_URL}/api/${student}/${file.replace('.mock.js', '')}/wipe` : `http://localhost:3000/api/${student}/${file.replace('.mock.js', '')}/wipe`);

		return urls;
	});

	let i = 0;

	const deleteData = (i) => {
		axios.delete(urls[i]).then((result) => {
			console.log('deleted', urls[i]);
			console.log('result', result.status, result.data);
			if (result.status === 200 && (i + 1) <= (urls.length - 1)) deleteData(i + 1);
		})
	}

	deleteData(i);

})();