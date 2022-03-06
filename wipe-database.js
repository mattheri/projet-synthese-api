const fs = require('fs');
const axios = require('axios').default;
const students = require('./students');
const string = require('./string');

// get all the mock files
fs.readdirSync('./mock').map(file => {
	students.map(student => {
		const path = file.replace('.mock.js', '');
		const url = process.env.API_URL ? `${process.env.API_URL}/api/${student}/${path}/wipe` : `http://localhost:3000/api/${student}/${path}/wipe/`;

		axios.delete(url).then((res) => console.log(res.data));
	})
});