const initRoute = (schema, name) => {
	return (req, res, next) => {
		let model = null;
		const connect = require('../connect');
		const modelFactory = require('../create-model');
		let modelFactoryInstance = null;

		if (!model) modelFactoryInstance = modelFactory(req.student);

		connect({ username: req.student, password: req.student })
			.then(() => {
				if (!model) model = modelFactoryInstance(
					{ name, schema: schema }
				);

				req[name] = model;

				next();
			})
	}
}

module.exports = initRoute;