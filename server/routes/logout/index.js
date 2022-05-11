'use strict';
// logout
const createError = require('http-errors');

function logout(req, res, next) {
    if (req.method !== 'POST') return next(createError.MethodNotAllowed());
    if (req.authenticated) {
        try {
            req.server.auth.jwt.logout(req);
            return next(createError.Unauthorized());
        } catch (error) {
            return next(error);
        }
    }
    return next(createError.BadRequest());
}

module.exports = logout;
