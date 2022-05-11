'use strict';
// http://expressjs.com/en/4x/api.html#router.route
const router = require('express').Router();
const parseJson = require('express').json();
const createError = require('http-errors');

async function refresh(req, res, next) {
    if (req.server.auth.mode && req.server.auth.mode === 'refreshTokens') {
        if (req.body && req.body.refresh) {
            try {
                let response = await req.server.auth.jwt.refresh(req);
                return res.status(201).json(response);
            } catch (error) {
                return next(error);
            }
        }
    } else {
        return next(createError.Forbidden());
    }
    return next(createError.BadRequest());
}

router.use(parseJson, refresh);

module.exports = router;
