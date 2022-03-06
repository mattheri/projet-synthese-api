const { faker } = require("@faker-js/faker");

const generateMock = (times = 10) => {
	return new Promise((resolve) => {
		const mock = [];

		for (let i = 0; i < times; i++) {
			mock.push({
				name: faker.company.companyName(),
				description: faker.lorem.paragraph(),
				imageUrl: faker.image.business(),
				contactName: `${faker.name.firstName()} ${faker.name.lastName()}`,
				contactEmail: faker.internet.email(),
				contactPhone: faker.phone.phoneNumber(),
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