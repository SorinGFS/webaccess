'use strict';
// https://expressjs.com/en/4x/api.html#express.router
const router = require('express').Router();
const fs = require('zerodep/node/fs');

fs.dirs(__dirname).forEach((route) => router.use(`/${route}/`, require(`./${route}`)));

module.exports = router;
