const mongoose = require("mongoose");
const string = require("./string");

function createModel(student) {
  return ({ name, schema }) => {
    if (!schema.options.toObject) schema.options.toObject = {};

    schema.options.toObject.transform = function (_, ret) {
      delete ret.user;
      return ret;
    };

    schema.statics[string.methodize(name, "find")] = function (id) {
      return new Promise((resolve, reject) => {
        this.findById(id).exec((err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result?.toObject() || {});
          }
        });
      });
    };

    schema.statics[string.methodize(name, "findAll")] = function () {
      return new Promise((resolve, reject) => {
        this.find({})
          .where("user")
          .equals(student)
          .exec((err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.map((r) => r.toObject()));
            }
          });
      });
    };

    schema.statics[string.methodize(name, "create")] = function (data) {
      return new Promise((resolve, reject) => {
        if (data.__v) delete data.__v;
        if (data._id) delete data._id;
        this.create(data).then(() => {
          this.find({})
            .where("user")
            .equals(student)
            .exec((err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result.map((r) => r.toObject()));
              }
            });
        });
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    };

    schema.statics[string.methodize(name, "update")] = function (id, data) {
      return new Promise((resolve, reject) => {
        if (data.__v) delete data.__v;
        if (data._id) delete data._id;
        new Promise((resolve, reject) => {
          this.findOneAndUpdate({ _id: id, user: student }, data, {
            new: true,
            lean: true,
          }).exec((err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        })
          .then((result) => {
            const updateResult = result;
            this.find({})
              .where("user")
              .equals(student)
              .exec((err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(
                    result.map((r) => {
                      if (r._id.toString() === updateResult._id.toString()) {
                        return updateResult;
                      } else {
                        return r.toObject();
                      }
                    })
                  );
                }
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

    schema.statics[string.methodize(name, "delete")] = function (id) {
      return new Promise((resolve, reject) => {
        this.findOneAndDelete({ _id: id, user: student }).exec(
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              this.find()
                .where("user")
                .equals(student)
                .exec((err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result.map((r) => r.toObject()));
                  }
                });
            }
          }
        );
      });
    };

    schema.statics[string.methodize(name, "deleteAll")] = function () {
      return new Promise((resolve, reject) => {
        this.deleteMany({}).then((res) => resolve("success", res));
      });
    };

    schema.statics[string.methodize(name, "createMany")] = function (data) {
      return new Promise((resolve, reject) => {
        this.insertMany(data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    return mongoose.model(string.capitalize(name), schema);
  };
}

module.exports = createModel;
