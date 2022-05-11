'use strict';
// DO NOT MODIFY - this is standard specific config index
// returns required configs as ARRAY (available and enabled dirs MUST exist and files in enabled.json MUST exist in available dir)
module.exports = (filter) => {
    return require('../')(__dirname, filter);
};
