const joi = require("joi");
const HttpStatusCode = require("http-status-codes");

class AuthValidator {
  constructor() {}

  static async login(req, res, next) {
    try {
      await joi
        .object({
          EmailAddress: joi.string().email().max(100).required(),
          Password: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send("Must have correct data entry.");
    }
  }
}

module.exports = AuthValidator;
