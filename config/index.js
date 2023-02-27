'use strict';
// DO NOT MODIFY - this is standard generic config index
// returns configs as ARRAY from the directories where it is requested
module.exports = (workdir, filter) => {
    const fs = require('zerodep/node/fs');
    const fn = require('zerodep/node/fn');
    const enabled = require(fs.pathResolve(workdir, 'enabled'));
    const sources = (paths) => {
        if (paths && typeof paths === 'string') return [...require(fs.pathResolve(workdir, paths))];
        const result = [];
        paths.forEach((path) => {
            result.push(...require(fs.pathResolve(workdir, path)));
        });
        return result;
    };
    let configs = [];
    enabled.forEach((config) => configs.push(require(fs.pathResolve(workdir, 'available', config))));
    fn.replaceDeepKey('include', sources, configs);
    const filtered = configs.filter((config) => {
        return filter(config);
    });
    return filtered;
};
