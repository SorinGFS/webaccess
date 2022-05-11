'use strict';
// DO NOT MODIFY - this is standard generic config index
// returns configs as ARRAY from the directories where it is requested
module.exports = (workdir, filter) => {
    const fs = require('webaccess-base/fs');
    const fn = require('webaccess-base/fn');
    // if enabled.json exists it will automatically update the links it contains
    if (fs.exists(workdir, 'enabled.json')) {
        const enabled = require(fs.pathResolve(workdir, 'enabled.json'));
        const enable = require('./enable');
        enable(workdir, enabled);
    }
    const links = fs.links(workdir, 'enabled');
    const sources = (paths) => {
        if (paths && typeof paths === 'string') return [...require(fs.pathResolve(workdir, paths))];
        const result = [];
        paths.forEach((path) => {
            result.push(...require(fs.pathResolve(workdir, path)));
        });
        return result;
    };
    let configs = [];
    links.forEach((config) => configs.push(require(fs.pathResolve(workdir, 'enabled', config))));
    fn.replaceDeep(configs, 'include', sources);
    const filtered = configs.filter((config) => {
        return filter(config);
    });
    return filtered;
};
