[Back to Main Page](https://github.com/SorinGFS/webaccess#documentation)

## Server Configuration

This application was inspired by Nginx's way of doing things with the use of blocks: `http`, `server`, `location`. So, seemingly similar settings have different priority depending on their position: `server` overwrites `http`, and location overwrites both `http` and `server`. Think the `http` block at `Express` level, and here you can configure the `server` and it's `locations`.

The motivation behind this mechanism is simple: in accessing the web some routes need more processing than others and it would make no sense to reduce the speed to the level of the slowest route. This mechanism provides granular control over the processes that take place at each level.

Each level is controlled through modules, individual or grouped and which can be found in the `middlewares` directory. The order in which they are processed is set in the main and secondary routers, so the order in which they are put in configuration does not matter.

Each module (middleware) has its own properties that can be found in its own configuration documentation.

The configurations of all servers are processed on load, stored in memory, and then dinamically selected according to the request. The selection of the server at runtime is based on the `serverName` which must contain `req.hostname`. The configuration of each server is made up practically on the basis of the modules configured in it and is located in the file `config/servers/available/*.json`.

#### Access Basics

Servers can be configured for any of the following cases:

-   many domains can be directed to the same server
-   any domain can be directed to multiple servers depending on the route

### Server structure

**File:** `config/servers/available/my-custom-server.json`

```json
{
    "serverName": "domain-or-ip",
    "secretKey": "if-secretKey-is-provided-RSA-keys-wont-be-used",
    "privateKeyPath": "absolute-path",
    "publicKeyPath": "absolute-path",
    "server": {
        "proxyPass": "localhost:1337",
        "module-1": { "...": "..." },
        "module-2": { "...": "..." },
        "...": { "...": "..." },
        "module-N": { "...": "..." },
        "locations": [
            {
                "^/route": {
                    "module-1": { "...": "..." },
                    "...": { "...": "..." }
                }
            },
            {
                "^/another-route": {
                    "module-2": { "...": "..." },
                    "...": { "...": "..." }
                }
            }
        ]
    }
}
```

**Important:** Route match is based on `javascript RegExp` without flags (case sensitive). `RegExp flags` are available with `regexFlags` directive placed inside the route, like following:

```json
{
    "^/route": {
        "regexFlags": "i",
        "...": "..."
    }
}
```

**Server structure related directives (built-in server not modules)**

| Directive                                      | Type                     | Default | Required | Description                                                                                         |
| ---------------------------------------------- | ------------------------ | ------- | -------- | --------------------------------------------------------------------------------------------------- |
| self                                           | object                   |         | TRUE     | The config itself.                                                                                  |
| [serverName](https://github.com/SorinGFS/webaccess/blob/master/config/servers/readme.md#server-name)                   | string or array          |         | TRUE     | The server name as hostname or ip, or array of them.                                                |
| secretKey                                      | string                   |         | FALSE    | Secret key used by JWT, if provided takes precedence over RSA keys.                                 |
| privateKey                                     | string (path)            |         | FALSE    | RSA private key file path.                                                                          |
| publicKey                                      | string (path)            |         | FALSE    | RSA public key file path.                                                                           |
| server                                         | object                   |         | TRUE     | The object containing configurations for server block modules.                                      |
| locations                                      | array of objects         |         | FALSE    | The array of objects containing configurations for location block modules.                          |
| [vhost](https://github.com/SorinGFS/webaccess/blob/master/config/servers/readme.md#virtual-hosts)                      | string (path)            |         | FALSE    | The path to Express app, router, or middleware, or any app that can handle \`req, res\` by its own. |
| [include](https://github.com/SorinGFS/webaccess/blob/master/config/servers/readme.md#including-entire-files-in-config) | string or array          |         | FALSE    | The path or array of /includes/\* paths to be included in config.                                   |
| [appSettings](https://github.com/SorinGFS/webaccess/blob/master/config/servers/readme.md#app-settings)                 | object                   |         | FALSE    | The settings passed to Express\`app.                                                                |
| [urlRewrite](https://github.com/SorinGFS/webaccess/blob/master/config/servers/readme.md#url-rewrite)                   | array or array of arrays |         | FALSE    | Rewrite rule or rules. Syntax: \[regex, replacement, breakingFlag?, regexFlags?\]                   |
| return                                         | number                   |         | FALSE    | Return status code.                                                                                 |

### Server Name

As the name suggests, `serverName` contains the names or IPs to which the server responds, and in addition to the unique form presented above, it can also be in the form of an array:

**File:** `config/servers/available/my-custom-server.json`

```json
{
    "serverName": ["domain.com", "sub.domain.com", "ip"],
    "...": { "...": "..." },
    "server": {
        "...": { "...": "..." }
    }
}
```

### App Settings

`Express` app can be also configured at `server` and `location` levels using `appSettings` directive. For a list of available settings see [Express app(set)](https://expressjs.com/en/api.html#app.set). However, some of those settings can't be dynamically set in `server` due to the way that `Express` calls their corresponding functions only once at the app loading time. So, the following settings can be controlled by placing their settings in the main `config/app.settings`:
- `trust proxy`: it doesn't make sense to have settings on server basis, it should be set `true` if `app` is behind a trusted proxy or `false` if the `app` is facing the internet. Default: `false`,
- `query parser`: is not inherited in the `server`, so for performance reasons was disabled. Default: `false`,
- `x-powered-by`: is not inherited in the `server`, so for performance reasons was disabled. Default: `false`,

Also in the same `config/app` define:
- `accessDbName` - the name of the database used for `auth access permissions`, `access logs`, `error logs` and so on. Default: `access`, if the `app` is a `sub app` of the main `app` this setting can target another database.
- `listen` - instruct `app` to listen or not. Default: `true`, if the `app` is a `sub app` of the main `app` this can be set to `false`.

The following setings does not work at all:
- `env`: the setting is managed by the `cross-env` dependency,
- `strict routing`: is not inherited in the `server` and in the main `app` there are no handled routes. To obtain `strict routing` in a particular route use `const router = require('express').Router({ strict: true })`

Dynamically manageable settings are:
- `etag`
- `jsonp callback name`
- `json escape`
- `json spaces`
- `json replacer`
- `subdomain offset`
- `views`
- `view cache`
- `view engine` (the engines still has to be installed in the main `app`, see [official docs](https://expressjs.com/en/resources/template-engines.html))

**Example configuration:**

**File:** `config/servers/available/my-custom-server.json`

```json
{
    "serverName": "domain-or-ip",
    "server": {
        "appSettings": { "etag": false },
        "...": { "...": "..." },
        "locations": [
            {
                "^/route": {
                    "appSettings": {
                        "json escape": true,
                        "json spaces": 2,
                        "etag": "strong"
                    },
                    "...": { "...": "..." }
                }
            }
        ]
    }
}
```
**Note:** in this example `etag` was disabled at `server` level and enabled at `location` level.

### URL Rewrite

The server built-in URL Rewrite module is entirely inspired by [Nginx's rewrite module](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html). However, only `rewrite`, `return` and `break` directives are supported, `if` and `set` are not. For `rewrite` we use the term `urlRewrite`, and all their breaking flags are suported: `last`, `break`, `redirect` or `permanent`. As rewrite function server uses the [javascript's replace function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

#### URL Rewrite at server level example

**File:** `config/servers/available/my-custom-server.json`

```json
{
    "serverName": "domain-or-ip",
    "server": {
        "urlRewrite": [
            ["^(/download/.*)/media/(w+).?.*$", "$1/mp3/$2.mp3", "last"],
            ["^(/download/.*)/audio/(w+).?.*$", "$1/mp3/$2.ra", "last"]
        ],
        "return": 403,
        "...": { "...": "..." },
        "locations": [
            {
                "^/download": {
                    "...": { "...": "..." }
                }
            }
        ]
    }
}
```

#### URL Rewrite at location level example

**File:** `config/servers/available/my-custom-server.json`

```json
{
    "serverName": "domain-or-ip",
    "server": {
        "...": { "...": "..." },
        "locations": [
            {
                "^/route": {
                    "urlRewrite": ["^(.*)$", "https://anotherDomain.com$1", "permanent"]
                }
            }
        ]
    }
}
```

### Injecting vars into request via config

All settings placed in the config will be usable after the server has been selected based on the `req.hostname` by accessing `req.server`. If a `server > locations > path` was used then the settings inside it are merged into parent `server`, so inside `req.server` the settings represents the already selected path. The `req.server.site` object has a special meaning as settings shareable with frontend, and their settings will be merged into `req.site` after the server has been selected. Basically, the `req.server.site` settings are the initial defaults for the `req.site` which then can be updated while passing through the routes. Due to the fact that `req.site` is available **after** the path was choosen allows us to perform various tasks inside the already selected route (in site), including reparsing the path using a `sub router` having its settings (`routes` and `options`) gathered from `req.site.router`. Some of the use cases may be setting a `controller`, `translations`, `validation schema`, `filters`, and so on... 

#### Example how to set a sub router with custom settings

**File:** `config/servers/available/my-custom-server.json`

```json
{
    "serverName": "domain-or-ip",
    "server": {
        "...": { "...": "..." },
        "locations": [
            {
                "^/api": {
                    "...": { "...": "..." },
                    "site": {
                        "language": "en",
                        "database": "blog",
                        "controller": "posts",
                        "action": "index",
                        "router": {
                            "routes": [
                                "/:language([a-z]{2}|[a-z]{2}-[a-z]{2})?/:_id([a-f0-9]{1,24})?/:action(count|distinct|data|validation|indexes|info)/*",
                                "/:language([a-z]{2}|[a-z]{2}-[a-z]{2})?/:controller([a-z]{3,30})?/:_id([a-f0-9]{1,24})?/:action(count|distinct|data|validation|indexes|info)?/*"
                            ],
                            "options": {
                                "strict": true
                            }
                        }
                    }
                }
            }
        ]
    }
}
```
... then use the settings inside a file:

**File:** `server/some/path/api.js`

```js
const express = require('express');
const router = express.Router();
// set the sub router with options from `req.site.router.options` and use it inside the parent router
const setRoutes = (req, res, next) => {
    if (!req.site.router) req.site.router = {};
    if (!req.site.router.routes) req.site.router.routes = '/';
    const subRouter = express.Router(req.site.router.options);
    router.use(subRouter);
    subRouter.use(req.site.router.routes, mid1, mid2/*, ...mids */);
    next();
};
// perform the tasks inside the route
const mid1 = (req, res, next) => {
    // dp whatever
    next();
}
const mid2 = (req, res, next) => {
    // dp whatever
    next();
}
// use the sub router
router.use(setRoutes);
module.exports = router;
```

### Virtual Hosts

Similarly to a proxy a Virtual Host is a final destination of a request, but differently the request is passed to it directly without a new `http` request. It can be another app, an api, a service, an interface, a website or anything that can handle `req, res` by its own.

### Including entire files in config

Each server config may also include another files located in `config/servers/includes/**/*.json` and referred inside config at any level by the `include` directive. Included files must exist in `config/servers/includes/**` directory no matter how deep. The files will be included based on directives inside server configs in the specified position. They can be included anywhere, but in such a way that after inclusion the resulting configuration should be valid. Included files may also contain `include` directive. Here some examples about including files:

**File:** `config/servers/available/my-server.json`

```json
{
    "serverName": "domain-or-ip",
    "include": "includes/keys/my-server.json",
    "server": {
        "proxyPass": "localhost:1337",
        "include": ["includes/access/my-server.json", "includes/locations/my-server.json", "includes/dev-tools/my-server.json"]
    }
}
```

**Important:**

-   on same level key similarity the later wins
-   on different level key similarity the deeper level wins
-   all included files must be `json` formatted as `array` of at least one `object`: `[{...}]`
-   including folders is also supported in which case included folder must contain `index.json` file with config in it
-   `serverName` directive can be a `string` for one name, or `array` for single or multiple names.
-   `include` directive can be a `string` for one file, or `array` for single or multiple files.
-   always inspect resulted config in console!

---

Once configured, the configuration must be enabled by adding the corresponding symlink in `enabled` directory. This can be done in two ways:

-   manually adding the symlink in `enabled` dir
-   automatically (default) by specifying the enabled files in `enabled.json` as follows:

**File:** `config/servers/enabled.json`

```json
["conf-1.json", "conf-2.json", "...", "conf-n.json"]
```

**Note:** in case of manual management the `enabled.json` must be removed.

Enabling folders instead of files is also supported, in which case enabled folder must contain `index.json` file with the config in it:

**File:** `config/servers/enabled.json`

```json
["myDomain.com", "anotherDomain", "...", "or-any-other-folder"]
```

**Note:** for the above example all folders must exist and must contain `index.json` file.