# Vuejs Kuzzle Plugin

This plugin simply exposes the Kuzzle SDK in your Vuejs components.

## Getting started

Install the plugin via

```bash
npm install vue-kuzzle
```

Then, in your Vuejs application, you need to register the plugin in your `Vue` class.

```javascript
import VueKuzzle from 'vue-kuzzle';

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

## Accessing the Kuzzle SDK instance within the app

You'll be able to access the Kuzzle SDK instance from the components as

```javascript
this.$kuzzle;
```

And from anywhere in your app where the `Vue` class is available, as

```javascript
Vue.prototype.$kuzzle;
```
