const { FadabHelper, selectAsync } = require('fadab-mysql-helper');

class TaskTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblTaskLog';
  }

  selectAsync(selectOptions = null) {
    return selectAsync('vwTaskLogList', selectOptions);
  }
}

module.exports = TaskTransactions;
