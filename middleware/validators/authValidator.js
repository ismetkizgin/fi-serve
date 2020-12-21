const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class AuthValidator {
  constructor() {}

  static async login(req, res, next) {
    try {
      await joi
        .object({
          EmailAddress: joi.string().email().max(100).required(),
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

  static async delete(req, res, next) {
    try {
      await joi
        .object({
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

  static async update(req, res, next) {
    try {
      await joi
        .object({
          FirstName: joi
            .string()
            .min(3)
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          LastName: joi
            .string()
            .min(2)
            .max(100)
            .pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı ]+$')),
          Password: joi.string().max(99).required(),
          EmailAddress: joi.string().min(3).max(200).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async changePassword(req, res, next) {
    try {
      await joi
        .object({
          Password: joi.string().min(6).max(99).required(),
          NewPassword: joi.string().min(6).max(99).required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async passwordControl(req, res, next) {
    try {
      await joi
        .object({
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

module.exports = AuthValidator;
