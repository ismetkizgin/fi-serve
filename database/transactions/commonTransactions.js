const { FadabHelper } = require('fadab-mysql-helper');

class CommonTransactions extends FadabHelper {
  constructor(tableName) {
    super();
    this.baseTable = tableName;
  }
}

module.exports = CommonTransactions;
