const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class UserValidator {
  constructor() {}

  static async limitAndOffset(req, res, next) {
    try {
      await joi
        .object({
          limit: joi.number(),
          offset: joi.number()
        })
        .with('offset', 'limit')
        .validateAsync(req.query);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async bodyId(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async paramId(req, res, next) {
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
}

module.exports = UserValidator;
