'use strict';
const dotenv = require('dotenv');
const result = dotenv.config({ silent: true, path: `./config/env/.env.${process.env.NODE_ENV}` });

// test config
if (result.error) {
    throw result.error;
}
console.log('NODE_ENV:', result.parsed);

module.exports = dotenv;
