# WebAccess

Access Management Reverse Proxy based on JWT.

## Documentation

- [Getting Started](config)
    - [Requirements](config#requirements)
    - [Instalation](config#installation)
    - [Proccess Manager](config#proccess-manager)
    - [Downstream Configuration](config#downstream-configuration)
- [Configuration Steps](config#configuration)
    1. [Environment Configuration](config/env)
    1. [Main App Configuration](config/app)
    1. [Database Connection Configuration](config/connections)
    1. [Server Configuration](config/servers)
        - [Middlewares](https://github.com/SorinGFS/webaccess-middlewares/tree/master)
            - [Http Parsers](https://github.com/SorinGFS/webaccess-middlewares/tree/master/http-parsers)
                - [Cookie Parser](https://github.com/SorinGFS/webaccess-middlewares/tree/master/http-parsers/cookie-parser)
                - [Http Console Logger](https://github.com/SorinGFS/webaccess-middlewares/tree/master/http-parsers/volleyball)
            - [Access](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access)
                - [Access Control](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/access-control)
                    - [Allow Contexts (e.g.,RBAC)](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/access-control/allow-contexts)
                    - [Allow Ips (firewall)](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/access-control/allow-ips)
                    - [Allow Http Methods](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/access-control/allow-methods)
                    - [Allow Origins](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/access-control/allow-origins)
                - [CSRF Protection](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/csrf-protection)
                - [Set Device (mobile-detect)](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/mobile-detect)
                - [Localization (MaxMind GeoIp)](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/localization)
                - [Fingerprint](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/fingerprint)
                - [Authenticate (using JWT)](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/authenticate)
                - [Spam Protection](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/spam-protection)
                    - [Rate Limit](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/spam-protection/rate-limit)
                    - [Slow Down (DDOS protection)](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/spam-protection/slow-down)
                - [Body Parsers](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/body-parsers)
                    - [Data Adapter](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/body-parsers/data-adapter)
                    - [Method Overwrite](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/body-parsers/method-override)
                    - [Parse Form](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/body-parsers/parse-form)
                    - [Parse Form Data (upload files using Multer)](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/body-parsers/parse-form-data)
                    - [Parse Json](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/body-parsers/parse-json)
                    - [Parse Text](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/body-parsers/parse-text)
                - [Access Logs](https://github.com/SorinGFS/webaccess-middlewares/tree/master/access/access-logs)
            - [Dev Tools](https://github.com/SorinGFS/webaccess-middlewares/tree/master/dev-tools)
                - [Console Logger](https://github.com/SorinGFS/webaccess-middlewares/tree/master/dev-tools/console-logger)
                - [Performance Timer](https://github.com/SorinGFS/webaccess-middlewares/tree/master/dev-tools/performance-timer)
            - [Http Error Logs](https://github.com/SorinGFS/webaccess-middlewares/tree/master/http-errors)
        - [Routes](server/routes)
            - [Refresh](server/routes/refresh)
            - [Logout](server/routes/logout)
        - [Proxy](server/proxy)
            - [Available Plugins](server/proxy#plugins)
                - [Strapi](https://github.com/SorinGFS/webaccess-strapi#webaccess-strapi)

**Note:** the server has built-in `urlRewrite`, direct db access, JWT support, dynamically added app and route settings and `RegExp` based route selector.

**Important:** Some modules are built-in or work only in a certain environment. For the rest of them there is one rule:

-   **if is not configured it doesn't run!**

### Examples and Presets

A growing list of reusable settings and examples can be found in [config/servers/includes](config/servers/includes).

### Todo next (in order of priority):

-   Add upstream support
-   Add local authentication
-   Add web admin interface

### Disclaimer

Please do not ask for support, since I'm a lone wolf I don't have time for this. I will try to improve the project within the time available.

### License

[MIT](LICENSE)
