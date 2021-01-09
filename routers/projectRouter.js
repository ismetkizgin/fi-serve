const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const limitedAuthControl = authorization.limitedAuthControl;
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');
const projectTransactions = TransactionsFactory.creating('projectTransactions');
const projectValidator = validators.projectValidator;

router.get(
  '/project',
  tokenControl,
  projectValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await projectTransactions.userProjectListAsync(
        req.decode.UserID
      );
      res.json(result[0]);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get(
  '/project/all',
  tokenControl,
  authControl,
  limitedAuthControl,
  projectValidator.limitAndOffset,
  async (req, res) => {
    try {
      if (req.Individual_Transactions) req.query.UserID = req.decode.UserID;
      const result = await projectTransactions.selectAsync({
        limit: req.body.limit,
        offset: req.body.offset
      });
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get(
  '/project/:Id',
  tokenControl,
  limitedAuthControl,
  projectValidator.paramId,
  async function (req, res, next) {
    try {
      if (req.Individual_Transactions) req.params.UserID = req.decode.UserID;
      const result = await projectTransactions.findOneAsync(req.params);
      res.json(result || {});
    } catch (errer) {
      res
        .status(errer.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(errer.message);
    }
  }
);

router.post(
  '/project',
  tokenControl,
  authControl,
  projectValidator.insert,
  async (req, res) => {
    try {
      req.body.UserID = req.decode.UserID;
      const result = await projectTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the project !'
        );
      res.json('Project successfully added.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  '/project',
  tokenControl,
  authControl,
  limitedAuthControl,
  projectValidator.update,
  async (req, res) => {
    try {
      let where = { Id: req.body.Id };
      const findProject = await projectTransactions.findOneAsync(where);
      if (!findProject)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such project ID in the system !'
        );

      if (
        req.Individual_Transactions &&
        findProject.UserID != req.decode.UserID
      )
        throw errorSender.errorObject(
          HttpStatusCode.UNAUTHORIZED,
          'Unauthorized transaction !'
        );

      projectTransactions.updateAsync(req.body, where);
      res.json('The project successfully updated the information.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  '/project',
  tokenControl,
  authControl,
  limitedAuthControl,
  projectValidator.bodyId,
  async (req, res) => {
    try {
      let where = { Id: req.body.Id };
      const findProject = await projectTransactions.findOneAsync(where);
      if (!findProject)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such project ID in the system !'
        );

      if (
        req.Individual_Transactions &&
        findProject.UserID != req.decode.UserID
      )
        throw errorSender.errorObject(
          HttpStatusCode.UNAUTHORIZED,
          'Unauthorized transaction !'
        );

      await projectTransactions.deleteAsync(where);
      res.json('The project successfully updated the information.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);
module.exports = router;
