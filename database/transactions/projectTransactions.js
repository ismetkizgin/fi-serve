const { FadabHelper, queryAsync } = require('fadab-mysql-helper');

class UserTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = 'tblProject';
  }

  userProjectListAsync(UserID) {
    return queryAsync('CALL prUserProjectList(?)', [UserID]);
  }
}

module.exports = UserTransactions;
