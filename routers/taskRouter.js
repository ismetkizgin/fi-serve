const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken, authorization } = require('../middleware');
const tokenControl = verifyToken.tokenControl;
const limitedAuthControl = authorization.limitedAuthControl;
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');
const taskTransactions = TransactionsFactory.creating('taskTransactions');
const taskLogTransactions = TransactionsFactory.creating('taskLogTransactions');
const projectUserTransactions = TransactionsFactory.creating(
  'projectUserTransactions'
);
const taskValidator = validators.taskValidator;

router.post(
  '/task',
  tokenControl,
  limitedAuthControl,
  taskValidator.insert,
  async (req, res) => {
    try {
      const projectUsers = await projectUserTransactions.selectAsync({
        ProjectID: req.body.ProjectID
      });

      if (!projectUsers.length)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such project ID in the system !'
        );

      if (
        req.Individual_Transactions &&
        (!projectUsers.find(
          projectUser => projectUser.UserID == req.body.UserID
        ) ||
          !projectUsers.find(
            projectUser => projectUser.UserID == req.decode.UserID
          ))
      )
        throw errorSender.errorObject(
          HttpStatusCode.UNAUTHORIZED,
          'Unauthorized transaction !'
        );

      const result = await taskTransactions.insertAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the task !'
        );

      res.json('Task successfully added.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.put(
  '/task',
  tokenControl,
  limitedAuthControl,
  taskValidator.update,
  async (req, res) => {
    try {
      const task = await taskTransactions.findOneAsync({
        Id: req.body.Id
      });

      if (!task)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such task ID in the system !'
        );

      const projectUsers = await projectUserTransactions.selectAsync({
        ProjectID: task.ProjectID
      });

      if (
        req.Individual_Transactions &&
        ((req.body.UserID &&
          !projectUsers.find(
            projectUser => projectUser.UserID == req.body.UserID
          )) ||
          !projectUsers.find(
            projectUser => projectUser.UserID == req.decode.UserID
          ))
      )
        throw errorSender.errorObject(
          HttpStatusCode.UNAUTHORIZED,
          'Unauthorized transaction !'
        );

      const result = await taskTransactions.updateAsync(req.body, {
        Id: req.body.Id
      });
      if (!result.affectedRows)
        throw errorSender.errorObject(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'There was a problem adding the task !'
        );

      if (
        req.body.TaskStatusName &&
        task.TaskStatusName != req.body.TaskStatusName
      )
        await taskLogTransactions.insertAsync({
          TaskID: req.body.Id,
          UserID: req.decode.UserID,
          TaskStatusName: req.body.TaskStatusName
        });

      res.json('Task successfully added.');
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.get('/task/:ProjectID', tokenControl, async (req, res) => {
  try {
    const projectUsers = await projectUserTransactions.findOneAsync({
      ProjectID: req.params.ProjectID,
      UserID: req.decode.UserID
    });

    if (!projectUsers)
      throw errorSender.errorObject(
        HttpStatusCode.NOT_FOUND,
        'There is no such project ID in the system !'
      );

    const result = await taskTransactions.selectAsync({
      where: { ProjectID: req.params.ProjectID }
    });
    res.json(result);
  } catch (err) {
    res
      .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

module.exports = router;
