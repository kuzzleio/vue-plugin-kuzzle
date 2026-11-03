# Vue.js Kuzzle Plugin

This plugin simply exposes the Kuzzle SDK in your Vuejs components.

## Compatibility matrix

| Vue.js | Kuzzle | Vue.js Kuzzle Plugin | npm dist-tag | Branch     |
| ------ | ------ | -------------------- | ------------ | ---------- |
| 3.x    | 2.x    | 5.x                  | `latest`     | `master`   |
| 2.7    | 2.x    | 4.x                  | `vue2`       | `4-stable` |
| 2.x    | 1.x    | 1.x                  | -            | `1-stable` |

`kuzzle-sdk` and `vue` are peer dependencies: install them alongside the plugin.

## Getting started

Install the plugin via

```bash
npm install vue-plugin-kuzzle kuzzle-sdk vue
```

For a Vue 2.7 application, install the 4.x line instead: `npm install vue-plugin-kuzzle@vue2`.

Then, register the plugin in your Vue application. It takes either an already instantiated Kuzzle SDK:

```javascript
import { createApp } from 'vue';
import { Kuzzle, WebSocket } from 'kuzzle-sdk';
import { VueKuzzle } from 'vue-plugin-kuzzle';

const kuzzle = new Kuzzle(new WebSocket('localhost'));

createApp(App).use(VueKuzzle, kuzzle).mount('#app');
```

or the options to instantiate one, as described below:

```javascript
createApp(App).use(VueKuzzle, options).mount('#app');
```

### `options.backends`

An object of available backends to connect to. Backends are POJOs of the following form (the example shows the default config):

```javascript
options.backends = {
  local: {
    host: 'localhost',
    protocol: 'websocket',
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
* `VUE_APP_BACKEND_PROTO` can be set to either `http` or `websocket`. If left blank, Websocket protocol is used by default.

For example, you can build your up to connect the Websocket to `wss://kuzzle.mydomain.com:443` like the following

```
VUE_APP_BACKEND_HOST=kuzzle.mydomain.com VUE_APP_BACKEND_PORT=443 VUE_APP_BACKEND_SSL=true npm run build
```

## Specify the backend via a global variable

You can also specify the backend config as a JSON-stringified POJO living in a global variable called `kuzzleBackend`. This variable must be available _before_ the Vue app is started, specifically before the `instantiateKuzzleSDK` public function is called. Here is an example of how to declare it

```javascript
const kuzzleBackend = JSON.stringify({
  host: 'myhost.mydomain.com',
  options: {
    port: 443,
    ssl: true
  }
})
```

## Specify the backend via localStorage

_Purely for debug purposes_, you can override all the backend configuration by setting your backend as stringified JSON in the `kuzzle-backend` Local Storage item, e.g.

```
{ "host": "myinstance.mydomain.io",  "options": { "port": 443, "ssl": true } }
```

**Beware that Local Storage is persistent and it is fairly easy to forget you set this item.** Use it consciously and keep in mind it is a good practice to unset it as soon as your debug session is over.

## Backend declaration precedence order

The plugin makes a choice of the available backend declaration by setting a preference order.

* Local storage (`kuzzle-backend`)
* Global variable (`kuzzleBackend`)
* Environment variables
* Options passed to `app.use`

## Accessing the Kuzzle SDK instance within the app

With the Composition API, use the composable inside `setup()` or `<script setup>`:

```javascript
import { useKuzzle } from 'vue-plugin-kuzzle';

const kuzzle = useKuzzle();
```

With the Options API, the instance is available in components as `this.$kuzzle` (typed through `ComponentCustomProperties`).

The instance is also provided under the `kuzzleInjectionKey` exported by the plugin, for `inject(kuzzleInjectionKey)`.

## Migrating from 4.x (Vue 2)

* Register the plugin on the app: `createApp(App).use(VueKuzzle, options)` instead of `Vue.use(VueKuzzle, options)`. The options are unchanged, and an already instantiated `Kuzzle` can be passed instead.
* `Vue.prototype.$kuzzle` is gone: use `useKuzzle()`, `this.$kuzzle` or `inject(kuzzleInjectionKey)`.
* `vue` and `kuzzle-sdk` are now peer dependencies, no longer installed by the plugin.
