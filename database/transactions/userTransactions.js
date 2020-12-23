const {
  FadabHelper,
  selectAsync,
  findOneAsync
} = require('fadab-mysql-helper');

class UserTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblUser';
  }

  selectAsync(selectOptions = null) {
    return selectAsync('vwUserList', selectOptions);
  }

  findAsync(where) {
    return findOneAsync('vwUserList', where);
  }
}

module.exports = UserTransactions;
