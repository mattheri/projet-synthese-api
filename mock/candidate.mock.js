const { faker } = require("@faker-js/faker");

const generateMock = (times = 10) => {
	return new Promise((resolve) => {
		const mock = [];

		for (let i = 0; i < times; i++) {
			mock.push({
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
				description: faker.lorem.paragraph(),
				jobTitle: faker.name.jobTitle(),
				email: faker.internet.email(),
				phone: faker.phone.phoneNumber(),
				address: faker.address.streetAddress(),
				city: faker.address.city(),
				province: faker.address.state(),
				postalCode: faker.address.zipCode(),
				published: Math.random() > 0.3,
			});
		}

		resolve(mock);
	})
}

module.exports = generateMock;