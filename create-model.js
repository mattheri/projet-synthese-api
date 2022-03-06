const mongoose = require('mongoose');
const string = require('./string');

function createModel(student) {
	return ({ name, schema }) => {
		schema.pre('save', function (next) {
			this.updatedAt = new Date();
			this.user = student;
			next();
		});

		if (!schema.options.toObject) schema.options.toObject = {};

		schema.options.toObject.transform = function (_, ret) {
			delete ret.user;
			return ret;
		}

		schema.statics[string.methodize(name, 'find')] = function (id) {
			return new Promise((resolve, reject) => {
				this.findById(id).exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						console.log(result);
						resolve(result?.toObject() || {});
					}
				});
			});
		}

		schema.statics[string.methodize(name, 'findAll')] = function () {
			return new Promise((resolve, reject) => {
				this.find({}).where('user').equals(student).exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result.map(r => r.toObject()));
					}
				});
			})
		}

		schema.statics[string.methodize(name, 'create')] = function (data) {
			return new Promise((resolve, reject) => {
				this.create(data).then(() => {
					this.find({}).where('user').equals(student).exec((err, result) => {
						if (err) {
							reject(err);
						} else {
							resolve(result.map(r => r.toObject()));
						}
					});
				});
			});
		}

		schema.statics[string.methodize(name, 'update')] = function (id, data) {
			return new Promise((resolve, reject) => {
				this.findOneAndUpdate({ id: id, user: student }, data).exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						this.find().where('user').equals(student).exec((err, result) => {
							if (err) {
								reject(err);
							} else {
								resolve(result.map(r => r.toObject()));
							}
						})
					}
				})
			});
		}

		schema.statics[string.methodize(name, 'delete')] = function (id) {
			return new Promise((resolve, reject) => {
				this.findOneAndDelete({ id: id, user: student }).exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						this.find().where('user').equals(student).exec((err, result) => {
							if (err) {
								reject(err);
							} else {
								resolve(result.map(r => r.toObject()));
							}
						})
					}
				})
			});
		}

		schema.statics[string.methodize(name, 'deleteAll')] = function () {
			return new Promise((resolve, reject) => {
				console.log('deleting all');
				this.remove({}).exec((err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve('wiping all ' + name + 's');
					}
				})
			});
		}

		return mongoose.model(string.capitalize(name), schema);
	}
}

module.exports = createModel;