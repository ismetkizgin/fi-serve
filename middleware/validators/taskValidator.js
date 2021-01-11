const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class TaskValidator extends CommonValidator {
  constructor() {
    super();
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
          TaskName: joi.string().max(150),
          Description: joi.string().empty(''),
          DueDate: joi.date(),
          UserID: joi.number(),
          TaskStatusName: joi.string().max(50)
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          TaskName: joi.string().max(150).required(),
          Description: joi.string().empty(''),
          DueDate: joi.date().required(),
          UserID: joi.number().required(),
          ProjectID: joi.number().required()
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = TaskValidator;
