[Back to Main Page](https://github.com/SorinGFS/webaccess#configuration)

### Motivation

It is a fact that access to internal applications can be much more easily controlled by an independent application located downstream. Think of a space surrounded by a fence and access is allowed only through a gate. This project aims to centrally manage access to multiple applications or services. The way this project is designed allows its use as an intermediary to perform sensitive operations in the backend instead of frontend.

### Requirements

    * node: >=12.19.0
    * npm: >=6.0.0
    * mongoDB >=3.6 (required if auth, access logs or error logs are enabled, or for restApi)
    * downstream server Nginx, Apache, or whatever, to proxy connections to this host (default `localhost:7331` for production, `localhost:3002` for development)

### Installation

WebAccess itself is just a transparent proxy. Install it first (in Windows use `GitBash` or spread the commands):

```shell
git clone https://github.com/SorinGFS/webaccess.git && cd webaccess && npm install
```

#### Start Development Environment

```shell
npm run dev
```

#### Start Production Environment

```shell
npm run start
```

### Proccess Manager

Along with manual or service unit management, the application proccesses can also be managed using `pm2`.
The file `pm2.config.json` is the ecosystem file for `pm2`. Details about using `pm2` may be found in [official documentation](https://pm2.keymetrics.io/docs/usage/application-declaration/).

Both `production` and `development` environments are configured in ecosystem file, and by default `development` environment is set to watch for changes. If no start arguments are provided both environments are started. In order to start a single environment the syntax is like following:

**to start app in production environment:**
```shell
pm2 start path/to/pm2.config.json --only webaccess
```

**to start app in development environment:**
```shell
pm2 start path/to/pm2.config.json --only webaccess-dev
```

### Downstream Configuration

The key point in setting downstream is that `Host` header transmitted to `WebAccess` must match the desired `webaccess` server's name and the proxied `http address` should match the address on which `webaccess` is running on (default `localhost:3002` for development, and `localhost:7331` for production).

There may be (at least) two scenarios of working with `webaccess`:
- continous integration (a single config for both `development` and `production` environments)
- paralel development (separate configs for `development` and `production` environments)

For both cases downstream config should look like this:

**File:** /etc/nginx/sites-available/...

```shell
upstream webaccess {
    server localhost:7331;
}

upstream webaccess-dev {
    server localhost:3002;
}

server {
    server_name www.example.com;
    location /change.me {
        proxy_pass http://webaccess;
        proxy_set_header Host $host;
    }
}

server {
    server_name dev.example.com;
    location /change.me {
        proxy_pass http://webaccess-dev;
        proxy_set_header Host $host;
    }
}
```

**Note:** for continous integration scenario would be a single `webaccess` server config having `serverName: ["www.example.com","dev.example.com"]`, while for paralel development scenario would exist separate `webaccess` server configs having `serverName: "www.example.com"` and `serverName: "dev.example.com"`. While working in continous integration scenario just by restarting the `production` environment would be sufficient to apply the changes made in `development` environment, in paralel development scenario would require to copy the config changes from `dev` to `production` and then to restart the `production` environment.

### Configuration

The application is designed in a maximum flexible way and allows granular control by configuring each module separately on each server and on each route. Initially the application has no configured server. The simplest way to test a setup is to create a server config with this minimum content: `{"serverName": "your.domain.com", "server":{}}` which will send a `404` response (meaning that server is working and the proper configuration may begin). 

[Go to configuration steps...](https://github.com/SorinGFS/webaccess#configuration)
