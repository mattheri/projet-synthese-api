const string = require('./string');

const getModel = (modelName) => {
	return (req) => {
		const model = req[modelName];

		return {
			findAll: model[string.methodize(modelName, 'findAll')].bind(model),
			find: model[string.methodize(modelName, 'find')].bind(model),
			create: model[string.methodize(modelName, 'create')].bind(model),
			update: model[string.methodize(modelName, 'update')].bind(model),
			delete: model[string.methodize(modelName, 'delete')].bind(model),
			wipe: model[string.methodize(modelName, 'deleteAll')].bind(model)
		}
	}
};

module.exports = getModel;