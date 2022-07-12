[Back to Main Page](https://github.com/SorinGFS/webaccess#documentation)

### Refresh Token

This route handles token renewval (searching the granted permission's refresh token in the database) for all hosted servers and for application itself by responding with a new access token on success, or with a `403 Forbidden` if logout succeeded (provided refresh token does not exist anymore and a new login is required), or if the refresh token is expired.

In order the refresh of the access token to succeed the server expects:
- a `POST` request **without Authorization header**,
- both the access token and the refresh token in the `req.body` like following:

```json
{
    "jwt": "the-access-token",
    "refresh": "the-refresh-token"
}
```

The server response will have the same format as the above but with a new access token.
