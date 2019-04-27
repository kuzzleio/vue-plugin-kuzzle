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

Where `options` should contain the following options.

### `options`

An object representing a backend to connect to. Backends are POJOs of the following form (the example shows the default config):

```javascript
options = {
  host: 'localhost',
  options: {
    port: 7512,
    sslConnection: false
  }
};
```

The plugin will instantiate the Kuzzle SDK with the `Websocket` protocol.

The backend settings can be overwritten using the `process.env.VUE_KUZZLE_BACKEND` environment variable. To use it, just a stringified version of the settings object.

If no settings are provided, the default `localhost` backend is choosen as fallback.

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
