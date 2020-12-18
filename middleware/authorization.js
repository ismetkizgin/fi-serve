const { routerAuthorization } = require('../utils');
const HttpStatusCode = require('http-status-codes');

class Authorization {
    constructor() { }

    static async authControl(req, res, next) {
        try {
            const auth = routerAuthorization[req.originalUrl.replace(/[^a-zA-Z -]/g, '')][req.method].Authorize;
            if (!auth || auth.indexOf(req.decode.UserStatusName) != -1)
                next()
            else
                res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Unauthorized transaction." });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

module.exports = Authorization;