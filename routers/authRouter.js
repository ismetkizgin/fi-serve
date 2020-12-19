const router = require('express')();
const jwt = require('jsonwebtoken');
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const commonTransactions = TransactionsFactory.creating('commonTransactions', {
  tableName: 'tblUser'
});
const authValidator = validators.authValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require('http-status-codes');

router.post('/login', authValidator.login, async (req, res) => {
  try {
    const result = await commonTransactions.findOneAsync(req.body);
    if (!result)
      throw {
        status: HttpStatusCode.BAD_REQUEST,
        message: 'Check your email address or password !'
      };

    const payload = {
      UserID: result.Id,
      UserTypeName: result.UserTypeName
    };
    const token = jwt.sign(payload, req.app.get('api_key'), {
      expiresIn: '7d'
    });
    res.json({ result, token });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

module.exports = router;
