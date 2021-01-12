const Roles = require('../models/roles');

module.exports = {
  user: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator]
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator]
    }
  },
  project: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager, Roles.Staff],
      Individual_Transactions: [Roles.Manager, Roles.Staff]
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
      Individual_Transactions: [Roles.Manager]
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager]
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
      Individual_Transactions: [Roles.Manager]
    }
  },
  project_user: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
      Individual_Transactions: [Roles.Manager]
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
      Individual_Transactions: [Roles.Manager]
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
      Individual_Transactions: [Roles.Manager]
    }
  },
  task: {
    POST: {
      Individual_Transactions: [Roles.Manager, Roles.Staff]
    },
    PUT: {
      Individual_Transactions: [Roles.Manager, Roles.Staff]
    }
  },
  task_log: {
    GET: {
      Individual_Transactions: [Roles.Manager, Roles.Staff]
    }
  }
};
