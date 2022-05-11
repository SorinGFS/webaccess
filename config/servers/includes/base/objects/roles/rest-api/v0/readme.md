[Back to Includes Index Page](https://github.com/SorinGFS/webaccess/blob/master/config/servers/includes)

### RestApi Roles v0 (basic)

These are the model actions alocated to roles and this schema is just an example containing all the available model actions. In order to build another role chart according needs a `json-schema` can be created using this `json` data. For more granular control these roles can be used in conjunction with `accessControl.allowContext` rules, e.g, restricting the access based on `site.controller`, `site.database`, or any other available context property.

**File to include:** 

```json
{
    "include": "includes/base/objects/roles/rest-api/v0"
}
```

| NodeJS Scope | NodeJS Action             | Rest Method | Rest Action | Rest Single | public               | authenticated        | author               | admin                | owner                |
| ------------ | ------------------------- | ----------- | ----------- | ----------- |:--------------------:|:--------------------:|:--------------------:|:--------------------:|:--------------------:|
| controller   | findOne                   | GET         | index       | TRUE        | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | findMany                  | GET         | index       |             | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | insertOne                 | POST        | index       | TRUE        |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | insertMany                | POST        | index       |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | updateOne                 | PATCH       | index       | TRUE        |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | updateMany                | PATCH       | index       |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | upsertOne                 | PUT         | index       | TRUE        |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | upsertMany                | PUT         | index       |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | deleteOne                 | DELETE      | index       | TRUE        |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | deleteMany                | DELETE      | index       |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | aggregate                 | POST        | procedure   |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | count                     | GET         | count       |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | distinct                  | GET         | distinct    |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | listIndexes               | GET         | indexes     |             | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | createIndex               | POST        | indexes     |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | dropIndex                 | DELETE      | indexes     |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | info                      | GET         | info        |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | getValidation             | GET         | validation  |             |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | setValidation             | POST        | validation  |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| controller   | setControllerOptions      | PATCH       | controllers |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| db           | listAuthorizedControllers | GET         | controllers |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| db           | createController          | POST        | controllers |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| db           | dropController            | DELETE      | controllers |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| db           | renameController          | PUT         | controllers |             |                      |                      |                      | :heavy\_check\_mark: | :heavy\_check\_mark: |
| db           | addUser                   | POST        | users       |             |                      |                      |                      |                      | :heavy\_check\_mark: |
| db           | removeUser                | DELETE      | users       |             |                      |                      |                      |                      | :heavy\_check\_mark: |
| db           | dropDatabase              | DELETE      | databases   |             |                      |                      |                      |                      | :heavy\_check\_mark: |
| admin        | listAuthorizedDatabases   | GET         | databases   |             |                      |                      |                      |                      | :heavy\_check\_mark: |
| admin        | addAdmin                  | POST        | admins      |             |                      |                      |                      |                      | :heavy\_check\_mark: |
| admin        | removeAdmin               | DELETE      | admins      |             |                      |                      |                      |                      | :heavy\_check\_mark: |