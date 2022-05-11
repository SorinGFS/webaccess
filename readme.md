# Express Access Proxy

Access Management Reverse Proxy based on JWT.

### Motivation

It is a fact that access to internal applications can be much more easily controlled by an independent application located downstream. It is as if a space is surrounded by a fence and access is allowed only through a gate. This project aims to centrally manage access to multiple applications or services. The way this project is designed allows its use as an intermediary to perform sensitive operations in the backend instead of frontend.

### Requirements

    * node: >=12.19.0
    * npm: >=6.0.0
    * mongoDB >=2.6
    * downstream server Nginx, Apache, or whatever, to proxy connections to this host (default `localhost:7331` for production, `localhost:3002` for development)

### Installation

Express Access Proxy itself is just a transparent proxy. Install it first:

```shell
cd /path/to/desired/location
git clone https://github.com/SorinGFS/webaccess.git
cd webaccess
npm install
```

Now, install the desired auth provider plugin, e.g Strapi:

```shell
npm run action install access-proxy -- -p strapi
```

<details>
<summary>Remove an installed plugin: <em>(Click to expand)</em></summary>

```shell
npm run action uninstall access-proxy -- -p strapi
```

</details>

That's all. To start the configuration process run:

```shell
npm run dev
```

This will start your app in development environment on `localhost:3002` where you should configure it according your needs.

To start the app in `production` environment configure the downstream server to proxy the requests to this app on `localhost:7331`, then run:

```shell
npm run start
```

#### Controlling the application using pm2

The file `pm2.config.json` is the ecosystem file for `pm2`. Details about using `pm2` may be found in [official documentation](https://pm2.keymetrics.io/docs/usage/application-declaration/).

Both `production` and `development` environments are configured in ecosystem file, and by default `development` environment is set to watch for changes. If no start arguments are provided both environments are started. In order to start a single environment the syntax is like following:

**to start app in production environment:**
```shell
pm2 start path/to/pm2.config.json --only proxy
```

**to start app in development environment:**
```shell
pm2 start path/to/pm2.config.json --only proxy-dev
```

### Configuration

The application is designed in a maximum flexible way and allows granular control by configuring each module separately on each server and on each route. Initially the application offers out of the box functionality by forwarding requests received on `localhost:3002` (or `localhost:7331` for `production` environment) to `localhost:1337`. The purpose for this behaviour is to help the user to adapt and to understand how to configure the application for their own needs.
**Important:** This application should only run behind a downstream server, there is no SSL/TLS support for now, therefore the communication between downstream server and this application is made in plain text. **So it can be used only when there is control and trust in the host machine!** Moreover, a downstream server like Nginx not only solves much of the http related security issues much faster but is also needed to direct requests to this application. Stil, this application can use existing SSL certificates to encrypt JWT authentication tokens and hopefully in the not too distant future will be able to secure traffic to the downstream server.

#### Downstream configuration

In order to be able to configure multiple servers on this application is neccesary to reset downstream `host` with the same value as the original `server_name` hosted downstream. 

**File:** /etc/nginx/sites-available/my-config.conf

```shell
server {
    server_name www.example.com;
    # ...
    # proxy pass everything to the application, or choose the desired route(s)
    location / {
        # proxy pass for development mode, for production change the port
        proxy_pass http://localhost:3002;
        # pass to the application the same hostname which is served to nginx
        # the hostname choosen here must be the one set in the application's server config
        proxy_set_header Host www.example.com;
        # various other required directives
    }
}
```

#### Configuration Steps

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
            - [Strapi](https://github.com/SorinGFS/strapi-access-proxy#strapi-access-proxy)

**Note:** the server has built-in `urlRewrite`, direct db access, JWT support, dynamically added app and route settings and `RegExp` based route selector.

**Important:** Some modules are built-in or work only in a certain environment. For the rest of them there is one rule:

-   **if is not configured it doesn't run!**

### Examples and Presets

A growing list of reusable settings and examples can be found in [config/servers/includes](config/servers/includes).

### Todo next (in order of priority):

-   Add upstream support
-   Add local authentication
-   Add web admin interface
-   SSL support to access apps located on the web.

### Disclaimer

Please do not ask for support, since I'm a lone wolf I don't have time for this. I will try to improve the project within the time available.

### License

[MIT](LICENSE)
