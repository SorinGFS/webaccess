[Back to Main Page](https://github.com/SorinGFS/webaccess#documentation)

### Logout Route

This route handles logout (by authenticating the `jwt` presented in `Autoriztion` header and removing the granted permissions from database) for all hosted servers and for application itself by responding with a `401 Unautorized` after success, amd with a `403 Forbidden` if logout already succeeded (provided token not valid anymore).

In order to succeed `logout` route must be placed in a path having `auth.mode` enabled, so if `auth` is disabled at `server` level this route must be either moved in a path having `auth.mode` enabled, or must be placed in config as having `auth.mode` enabled like following:

```json
{
    "serverName": "myDomain.com",
    "...": "...",
    "server": {
        "locations": [
            {
                "/logout": { "auth": { "mode": true } }
            }
        ],
        "...": "..."
    }
}
```

**Note:** this is the only place where `auth.mode: true` can be used.
