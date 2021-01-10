const {
  FadabHelper,
  selectAsync,
  findOneAsync
} = require('fadab-mysql-helper');

class TaskTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblTask';
  }

  selectAsync(selectOptions = null) {
    return selectAsync('vwTaskList', selectOptions);
  }

  findAsync(where) {
    return findOneAsync('vwTaskList', where);
  }
}

module.exports = TaskTransactions;
