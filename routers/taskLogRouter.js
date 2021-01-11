const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { verifyToken, authorization } = require('../middleware');
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require('http-status-codes');
const { errorSender } = require('../utils');
const limitedAuthControl = authorization.limitedAuthControl;
const taskLogTransactions = TransactionsFactory.creating('taskLogTransactions');
const taskTransactions = TransactionsFactory.creating('taskTransactions');

router.get(
  '/task-log/:TaskID',
  tokenControl,
  limitedAuthControl,
  async (req, res) => {
    try {
      const task = await taskTransactions.findOneAsync({
        Id: req.params.TaskID
      });

      if (!task)
        throw errorSender.errorObject(
          HttpStatusCode.GONE,
          'There is no such task ID in the system !'
        );

      if (req.Individual_Transactions) {
        const projectUsers = await projectUserTransactions.findOneAsync({
          ProjectID: task.ProjectID,
          UserID: req.decode.UserID
        });

        if (!projectUsers)
          throw errorSender.errorObject(
            HttpStatusCode.UNAUTHORIZED,
            'Unauthorized transaction !'
          );
      }

      const result = await taskLogTransactions.selectAsync({
        where: { TaskID: req.params.TaskID },
        orderBy: {
          fields: 'Id',
          ranking: 'DESC'
        }
      });
      res.json(result);
    } catch (err) {
      res
        .status(err.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
