const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonUserValidator = require('./commonValidator');

class UserValidator extends CommonUserValidator {
  constructor() {}

  static async find(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().min(1).required()
        })
        .validateAsync({ Id: parseInt(req.params.Id) });
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
          FirstName: joi
            .string()
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          LastName: joi
            .string()
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          EmailAddress: joi.string().max(100).email(),
          UserTypeName: joi.string()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          FirstName: joi
            .string()
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$'))
            .required(),
          LastName: joi
            .string()
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$'))
            .required(),
          EmailAddress: joi.string().max(100).email().required(),
          UserTypeName: joi.string().required(),
          Password: joi.string().max(99).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }
}

module.exports = UserValidator;