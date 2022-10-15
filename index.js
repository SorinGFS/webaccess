'use strict';
// The application transfers the requests to the server according to the requested host.
const env = require('./config/env');
const fn = require('zerodep/node/fn');
const app = require('express')();
const appConfig = require('./config/app');
const accessDb = require('./config/connections')((config) => config.database === appConfig.accessDbName)[0];
const configs = require('./config/servers')(() => true); // filter all
const servers = require('webaccess-servers')(configs);
const httpParsers = require('webaccess-middlewares/http-parsers');
const handleError = require('webaccess-middlewares/http-errors');
const createError = require('http-errors');
const server = require('./server');
// set app (if your app sits behind a proxy you trust set "trust proxy": true in config, for more info see docs!)
if (appConfig.settings) Object.keys(appConfig.settings).forEach((key) => app.set(key, appConfig.settings[key]));
// app listen
if (appConfig.listen) app.listen(process.env.PORT, console.log(`${process.env.APP_NAME} is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));
// select server based on request hostname and paste it to the request
const setServer = (req, res, next) => {
    // using the serialized serverName in base servers
    req.server = Object.freeze(servers[Object.keys(servers).filter((name) => new RegExp(fn.btoa(`<${req.hostname}>`)).test(name))[0]]);
    if (!req.server) return next(createError.NotFound());
    // rewrite at server level
    if (req.server.urlRewrite) req.server.rewrite(req, req.server.urlRewrite);
    // parse locations (also rewrite at location level if any)
    req.server.parseLocations(req);
    // send direct response if this resulted from the parsed configuration
    if (req.sendStatus) return req.server.send(req, res);
    // apply app settings after the server has been combined with the location config
    if (req.server.appSettings) Object.keys(req.server.appSettings).forEach((key) => app.set(key, req.server.appSettings[key]));
    // mark time for logs
    if (req.server.accessLogs || req.server.errorLogs) req.start = new Date().getTime();
    // set accessDb connection
    if (req.server.accessLogs || req.server.errorLogs || (req.server.auth && req.server.auth.mode)) req.accessDb = req.server.getModel(accessDb);
    // init site (state) with server defaults if any. This object will hold only frontend shareable vars.
    req.site = Object.assign({}, req.server.site);
    next();
};
// load the settings then pass the request to main server router
app.use(httpParsers, setServer, server, handleError);
// it is possible to chain the same app as sub app of this app with own settings
module.exports = app;
