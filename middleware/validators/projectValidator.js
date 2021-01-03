const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonUserValidator = require('./commonValidator');

class UserValidator extends CommonUserValidator {
  constructor() {}

  static async list(req, res, next) {
    try {
      await joi
        .object({
          limit: joi.number(),
          offset: joi.number(),
          UserID: joi.number()
        })
        .with('offset', 'limit')
        .validateAsync(req.query);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
          ProjectName: joi.string().max(200),
          Description: joi.string().max(350)
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
          ProjectName: joi.string().max(200).required(),
          Description: joi.string().max(350).required()
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = UserValidator;
