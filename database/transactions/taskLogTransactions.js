const { FadabHelper } = require('fadab-mysql-helper');

class TaskTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblTaskLog';
  }
}

module.exports = TaskTransactions;
