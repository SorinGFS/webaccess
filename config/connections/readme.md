[Back to Main Page](https://github.com/SorinGFS/webaccess#documentation)

### Database Connection Configuration

This application is designed to be able to make connections to multiple databases using multiple connector types. This is where these connections are configured. At the time of connection, the connection that is designated by the database will be chosen.

Each connection must be configured in a separate file located in the `available` directory. The file name is relevant only to the user. The selection of the connection will be made by the `database` key and `connector` value must correspond to an existing connector file in `base` directory. By default this application uses `mongodb` connector, aka [native mongodb driver](https://github.com/mongodb/node-mongodb-native). More about configuring connection options can be found in [mongodb driver documentation](https://docs.mongodb.com/drivers/node/current/).

**File:** `mongodb-access.json`

```json
{
    "database": "access",
    "connector": "mongodb",
    "...": "..."
}
```

**Note:** DO NOT MODIFY existing connection `database` in this file!
**Important:** one database can have a single connector!

#### MongoDB with multiple instances

**File:** `mongodb-access.json`

```json
{
    "database": "access",
    "connector": "mongodb",
    "authenticator": {
        "database": null,
        "username": null,
        "password": null
    },
    "hosts": [
        { "hostname": "domain-1.tld", "port": 1234 },
        { "hostname": "domain-2.tld", "port": 1234 },
        {"...": "..."},
        { "hostname": "domain-N.tld", "port": 1234 }
    ],
    "options": {
        "retryWrites": true,
        "writeConcern": { "w": "majority" }
    }
}
```

Once configured, the configuration must be enabled by adding the corresponding config in `enabled/index.json`.

**File:** `config/connections/enabled/index.json`

```json
["conf-1.json", "conf-2.json", "...", "conf-n.json"]
```

Placing configs inside folders is also possible, in which case the config inside the folder must be placed in `index.json` file. For example, if config is inside `config/connections/available/mongooose/index.json`:

**File:** `config/connections/enabled/index.json` should be:

```json
["mongoose"]
```
