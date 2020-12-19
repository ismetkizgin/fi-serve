const { FadabHelper } = require("fadab-mysql-helper");

class CommonTransactions extends FadabHelper {
  constructor(args) {
    super();
    this.baseTable = args.tableName;
  }
}

module.exports = CommonTransactions;
