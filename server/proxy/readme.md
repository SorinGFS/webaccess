[Back to Main Page](https://github.com/SorinGFS/webaccess#configuration)

### Proxy

The proxy may have 3 use cases:

-   auth proxy
-   modifier proxy
-   transparent proxy

The proxy needs 2 parameters: the host to pass, and the request/response parser. If the second parameter is not provided the result will be a transparent proxy. The second parameter is provided by installing the desired plugin into the application, and may be of type `webaccess-proxy` for application's own plugins, or just `proxy` for external plugins. While a proxy host may serve multiple purposes, a proxy can have only one role per route.

The proxy host selection is made based on `proxyPass` parameter in config, and the proxy options are taken from the installed plugin like following:

-   if `proxyName` parameter is found in config the proxy will select the path indicated by it. This is a `modifier proxy` and can be anything that can be made with `express-http-proxy` capabilities. See official documentation below.
-   if first option is not available then proxy will search for enabled `server.auth`'s `provider.name` and will select the path indicated by it. This is an `auth proxy`.
-   if none of the first two options are found then proxy will be transparent.

`Auth proxy` is completely transparent with one exception: it filters the access token issued by providers like Strapi after a successful login. Every provider has its onw specific way of passing the token to the client, so for this reason every provider must have it's own proxy configuration. The application itself does not modify the requests in any way, it only uses the provided token data to generate it's own token, then it uses that token to allow or deny access.

The general syntax to install an `webaccess proxy`:

```shell
npm run action install webaccess-proxy -- -p provider-name -v provider-version
```

<details>
<summary>Remove an installed auth proxy plugin: <em>(Click to expand)</em></summary>

```shell
npm run action uninstall webaccess-proxy -- -p provider-name
```

</details>

The general syntax to install an `external proxy`:

```shell
npm run action install proxy -- -p provider-name -v provider-version
```

<details>
<summary>Remove an installed modifier proxy plugin: <em>(Click to expand)</em></summary>

```shell
npm run action uninstall proxy -- -p provider-name
```

</details>

**Note:** `provider-version` is optional, defaults to latest version.

#### Documentation

-   [Official documentation](https://github.com/villadora/express-http-proxy)

#### Configuration Examples

The use of proxy is determined by the `proxyPass` directive at `server` or `location` levels:

```json
{
    "serverName": "myDomain.com",
    "...": "...",
    "server": {
        "proxyPass": "localhost:1234",
        "...": "..."
    }
}
```

or

```json
{
    "serverName": "myDomain.com",
    "...": "...",
    "server": {
        "locations": [
            {
                "^/auth": {
                    "proxyPass": "localhost:1234",
                    "...": "..."
                }
            }
        ]
    }
}
```

**Auth proxy config example:**

```json
{
    "serverName": "myDomain.com",
    "...": "...",
    "server": {
        "proxyPass": "localhost:1234",
        "auth": {
            "mode": "slideExpiration",
            "provider": { "name": "strapi", "id": 1337 },
            "...": "..."
        }
    }
}
```

**Modifier proxy config example:**

```json
{
    "serverName": "myDomain.com",
    "...": "...",
    "server": {
        "proxyPass": "localhost:1234",
        "proxyName": "my-installed-proxy",
        "...": "..."
    }
}
```

**Important note:** when a proxy is installed the config must be manually adapted since there is no way for application to know to what server or servers belongs to.

#### Plugins

Available `Auth Proxies` are:

-   [strapi](https://github.com/SorinGFS/webaccess-strapi#webaccess-strapi)

#### Status

Active, configurable by installing plugins (proxyOptions)
