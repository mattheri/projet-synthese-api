const { faker } = require("@faker-js/faker");

const stageType = (fullTime) => {
	return {
		stageType: fullTime ? "fulltime" : "parttime",
		hoursPerWeek: fullTime ? faker.finance.amount(37.5, 40, 1) : faker.finance.amount(20, 30, 1),
	}
}

const getSkills = (times = 3) => {
	const skills = [];

	for (let i = 0; i < times; i++) {
		skills.push(faker.lorem.word());
	}

	return skills;
}

const getPayType = () => {
	return faker.random.arrayElements(["paid", "unpaid", "not-specified"], (Math.random() + 1) * 3);
}

const generateMock = (times = 10) => {
	return new Promise((resolve) => {
		const mock = [];

		for (let i = 0; i < times; i++) {
			mock.push({
				title: faker.name.jobTitle(),
				description: faker.lorem.paragraphs(),
				enterprise: faker.company.companyName(),
				startDate: faker.date.soon(20),
				endDate: faker.date.soon(60),
				program: faker.name.jobDescriptor(),
				requirements: faker.lorem.paragraphs(),
				...stageType(Math.random() > 0.7),
				additionalInfo: faker.lorem.paragraphs(),
				paid: getPayType(),
				skills: getSkills(),
				published: Math.random() > 0.3,
			});
		}

		resolve(mock);
	})
}

module.exports = generateMock;