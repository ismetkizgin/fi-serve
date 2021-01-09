const { FadabHelper, selectAsync } = require('fadab-mysql-helper');

class ProjectUserTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblProjectUser';
  }

  selectAsync(where) {
    return selectAsync('vwProjectUserList', { where });
  }
}

module.exports = ProjectUserTransactions;
