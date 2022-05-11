'use strict';
// https://expressjs.com/en/4x/api.html#express.router
const router = require('express').Router();

const access = require('webaccess-middlewares/access');
const routes = require('./routes');
const proxy = require('./proxy');
const handleError = require('webaccess-middlewares/http-errors');

const vhost = (req, res, next) => {
    if (req.server.vhost) router.use(require(req.server.vhost));
    next();
};

router.use(access, routes, proxy, vhost, handleError);

module.exports = router;
