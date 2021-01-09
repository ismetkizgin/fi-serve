const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const limitedAuthControl = authorization.limitedAuthControl;
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');
const projectTransactions = TransactionsFactory.creating('projectTransactions');
const userTransactions = TransactionsFactory.creating('userTransactions');
const projectUserTransactions = TransactionsFactory.creating(
  'projectUserTransactions'
);
const projectUserValidator = validators.projectUserValidator;

router.get(
  '/project-user/:Id',
  tokenControl,
  authControl,
  limitedAuthControl,
  projectUserValidator.paramId,
  async (req, res) => {
    try {
      if (req.Individual_Transactions) {
        const project = await projectTransactions.findOneAsync(req.params);
        if (project.UserID != req.decode.UserID)
          throw errorSender.errorObject(
            HttpStatusCode.UNAUTHORIZED,
            'Unauthorized transaction !'
          );
      }
      const result = await projectUserTransactions.selectAsync({
        ProjectID: req.params.Id
      });
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.post(
  '/project-user',
  tokenControl,
  authControl,
  limitedAuthControl,
  projectUserValidator.insert,
  async (req, res) => {
    try {
      if (req.Individual_Transactions) {
        const project = await projectTransactions.findOneAsync({
          Id: req.body.ProjectID
        });
        if (project.UserID != req.decode.UserID)
          throw errorSender.errorObject(
            HttpStatusCode.UNAUTHORIZED,
            'Unauthorized transaction !'
          );
      }
      const user = await userTransactions.findOneAsync({
        EmailAddress: req.body.EmailAddress
      });

      if (!user)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such project Email Address in the system !'
        );

      const result = await projectUserTransactions.insertAsync({
        ProjectID: req.body.ProjectID,
        UserID: user.Id
      });

      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the project user !'
        );
      res.json('Project user successfully added.');
    } catch (err) {
      if (err.errno === 1062)
        res
          .status(HttpStatusCode.CONFLICT)
          .send('User is already involved in the project !');
      else
        res
          .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

router.delete(
  '/project-user',
  tokenControl,
  authControl,
  limitedAuthControl,
  projectUserValidator.bodyId,
  async (req, res) => {
    try {
      const projectUser = await projectUserTransactions.findOneAsync(req.body);
      if (!projectUser)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such project user ID in the system !'
        );

      if (req.Individual_Transactions) {
        const project = await projectTransactions.findOneAsync({
          Id: projectUser.ProjectID
        });
        if (project.UserID != req.decode.UserID)
          throw errorSender.errorObject(
            HttpStatusCode.UNAUTHORIZED,
            'Unauthorized transaction !'
          );
      }

      const result = await projectUserTransactions.deleteAsync(req.body);

      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the project user !'
        );
      res.json('Project user successfully deleted.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
