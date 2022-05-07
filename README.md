# Mirai-Bot running at Typescript

## 1. Build
### 1) Install dependences.
```shell
npm install
or
yarn install
```
### 2) Build `.ts`
```shell
npm run build
or
yarn run build
```

### 3) Start Serve
```shell
npm run serve
or
yarn run serve
```
---

## 2. Configuration
> Prerequisite:
> node > 16
> npm > 8 || yarn > 1.22
> mirai-api-http(is login)
### 1) `config/config.json`
#### -> The basic configuration with this server.
```JSON
{
  "bot": {
    "host": "http://localhost:port",  // mirai-api-http hostname and port
    "verifyKey": "xxxxxx", //  symbol verifyKey
    "qq": 1234567, // qq number
    "enableWebsocket": false, // enable wensocket protocol?
    "wsOnly": false // only use websocket to connect?
  }
}
```

### 2) `config/netease.json`
#### -> Config the mod netease.
```JSON
{
  "netease": {
    "phone": 1234567, // netease account number
    "password": "1234567" // netease account password
  }
}
```

### 3) `config/plugins.json`
#### -> Config the plugins enable.
```JSON
{
    "plugins": {
        "archPackagesSearch": true, // ArchLinux Packages Information Query.
        "sendTest": true, // Test Module
        "netEaseSend": true // Netease Music Share.
    },
    "events": {
        "sendToConsole": true, // log the message to console.
        "petCommand": true, // budge Event
        "getHelp": true // Get help.
    }
}
```

### 4) `config/redis.json`
### -> Config the redis connection information, and whether to restrict the user's speech.
```JSON
{
    "redis": {
        "user": "default", // redis username
        "host": "127.0.0.1", // redis server host
        "port": 6378, // redis server port
        "password": "1234567890" // redis user password
    },
    "enable": false // enable redis to ban user?
}
```
## 3. Open source protocol.
[MIT](https://github.com/Sakura1943/Mirai-Bot/blob/main/LICENSE)

## 4. About
[https://blog.sakunia.tk/about/](https://blog.sakunia.tk/about)