'use strict';
// http://expressjs.com/en/4x/api.html#router.route
const router = require('express').Router();

const fs = require('webaccess-base/fs');
const expressProxy = require('express-http-proxy');

// set express-http-proxy host and proxyOptions
function proxy(req, res, next) {
    if (req.server.proxyPass) {
        const proxyOptions = () => {
            try {
                if (req.server.proxyName) return require(fs.pathResolve(__dirname, req.server.proxyName));
                if (req.server.auth) {
                    if (!req.server.auth.provider || !req.server.auth.provider.name) throw new Error(`Error: misconfigured Auth for ${req.hostname}, auth.provider.name is undefined!`);
                    return require(fs.pathResolve(__dirname, req.server.auth.provider.name));
                }
                return {};
            } catch (error) {
                next(error);
            }
        };
        const proxy = expressProxy((req) => req.server.proxyPass, proxyOptions());
        router.use(proxy);
    }
    next();
}

router.use(proxy);

module.exports = router;
