[Back to Main Page](https://github.com/SorinGFS/webaccess#documentation)

### Global Router

This router handles global routes before passing the request to proxy or vhost. If a route is not designed for any server it should be installed on the target server and accessed via proxy or vhost.

Existing routes:
    - Refresh => POST `/refresh`
    - Logout => POST `/logout`