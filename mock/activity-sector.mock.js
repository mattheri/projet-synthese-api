const { faker } = require("@faker-js/faker");

const generateMock = (times = 10) => {
	return new Promise((resolve) => {
		const mock = [];

		for (let i = 0; i < times; i++) {
			mock.push({
				title: faker.name.jobDescriptor(),
			});
		}

		resolve(mock);
	})
}

module.exports = generateMock;

