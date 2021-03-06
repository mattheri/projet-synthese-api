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

// Will determine if the internship offer is published or not
const determinePublishedState = (percent = 30) => {
	const convertedPercent = percent / 100;

	return Math.random() > convertedPercent;
}

const generateMock = (times = 10) => {
	return new Promise((resolve) => {
		const mock = [];

		const isPublished = determinePublishedState();

		for (let i = 0; i < times; i++) {
			mock.push({
				title: faker.name.jobTitle(),
				studentName: `${faker.name.firstName()} ${faker.name.lastName()}`,
				studentPresentation: faker.lorem.paragraphs(),
				school: faker.company.companyName(),
				startDate: faker.date.soon(20),
				endDate: faker.date.soon(60),
				program: faker.name.jobDescriptor(),
				...stageType(Math.random() > 0.7),
				additionalInfo: faker.lorem.paragraphs(),
				paid: getPayType(),
				skills: getSkills(),
				published: isPublished,
				active: isPublished,
				region: faker.address.state(),
				activitySector: faker.name.jobTitle(),
				city: faker.address.city(),
			});
		}

		resolve(mock);
	})
}

module.exports = generateMock;