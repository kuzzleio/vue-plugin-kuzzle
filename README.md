# Vue.js Kuzzle Plugin

This plugin simply exposes the Kuzzle SDK in your Vuejs components.

## Compatibility matrix

| Kuzzle Version | Vue.js Kuzzle Plugin Version |
| -------------- | ---------------------------- |
| 1.x.x          | 1.x.x                        |
| 2.x.x          | 2.x.x                        |

## Getting started

Install the plugin via

```bash
npm install vue-plugin-kuzzle
```

Then, in your Vuejs application, you need to register the plugin in your `Vue` class.

```javascript
import { VueKuzzle } from 'vue-plugin-kuzzle';

Vue.use(VueKuzzle, options);
```

Where `options` may contain the following options.

### `options.backends`

An object of available backends to connect to. Backends are POJOs of the following form (the example shows the default config):

```javascript
options.backends = {
  local: {
    host: 'localhost',
    options: {
      port: 7512,
      sslConnection: false
    }
  }
};
```

The plugin will instantiate the Kuzzle SDK with the `Websocket` protocol, choosing among the available backends based on the `process.env.VUE_APP_BACKEND` environment variable. If this variable is not specified, the `local` backend is choosen as fallback.

**Warning** Don't forget to `connect()` your instance before performing any actions.

### `options.sdkOptions`
An object that contains the SDK options.
You can find the available options list [here](https://docs.kuzzle.io/sdk/js/7/core-classes/kuzzle/constructor/#options)

## Specify the backend via environment variables

Aside from the `backends` option, you can define the backend to connect to entirely via environment variables.

* `VUE_APP_BACKEND_HOST` contains the hostname (e.g. `kuzzle.mydomain.com`),
* `VUE_APP_BACKEND_PORT` contains the port (e.g. `443`),
* `VUE_APP_BACKEND_SSL` can be set to `true` if the connection supports the SSL layer (do not set this variable if SSL is not supported).

For example, you can build your up to connect the Websocket to `wss://kuzzle.mydomain.com:443` like the following

```
VUE_APP_BACKEND_HOST=kuzzle.mydomain.com VUE_APP_BACKEND_PORT=443 VUE_APP_BACKEND_SSL=true npm run build
```

## Accessing the Kuzzle SDK instance within the app

You'll be able to access the Kuzzle SDK instance from the components as

```javascript
this.$kuzzle;
```

And from anywhere in your app where the `Vue` class is available, as

```javascript
Vue.prototype.$kuzzle;
```
