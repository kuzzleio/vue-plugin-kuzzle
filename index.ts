import { Kuzzle, WebSocket } from 'kuzzle-sdk';
import _Vue  from 'vue';

const LS_KEY = 'kuzzle-backend'
const GLOBAL_NAME = 'kuzzleBackend'

interface Backend {
  host: string;
  options: {
    port: number;
    sslConnection: boolean
  }
}

interface Backends {
  [name: string]: Backend
}

export function getBackendFromConf(backendsConfig: Backends) {
  const backends: Backends = {
    default: {
      host: process.env.VUE_APP_BACKEND_HOST || 'localhost',
      options: {
        port: parseInt(process.env.VUE_APP_BACKEND_PORT || '7512'),
        sslConnection: process.env.VUE_APP_BACKEND_SSL === 'true' || false
      }
    },
    ...backendsConfig
  }

  const backendName: string = process.env.VUE_APP_BACKEND
    ? process.env.VUE_APP_BACKEND
    : 'default';

    if (!backends[backendName]) {
      throw new Error(`Unable to find backend ${backendName} in configuration.`);
    }

  return backends[backendName] ? backends[backendName] : null;
}

export function getBackendFromLocalStorage() {
  const lsItem = localStorage.getItem(LS_KEY);
  if (!lsItem) {
    return null;
  }
  const backend = JSON.parse(lsItem)

  if (typeof backend !== 'object') {
    throw new Error(`Item found in localStorage (${LS_KEY}) is malformed. Expected an object, found ${backend}`)
  }

  return backend;
}

export function getBackendFromWindow() {
  if (!window[GLOBAL_NAME]) {
    return null
  }

  const backend = JSON.parse(window[GLOBAL_NAME])

  if (typeof backend !== 'object') {
    throw new Error(`Item found in global (${GLOBAL_NAME}) is malformed. Expected an object, found ${backend}`)
  }

  return backend;
}

export const instantiateKuzzleSDK = (backendsConfig: Backends, sdkOptions: any): Kuzzle => {
  const backend:Backend | null = getBackendFromLocalStorage() || getBackendFromWindow() || getBackendFromConf(backendsConfig)

  if (!backend) {
    throw new Error('No backend resolved.');
  }

  if (!backend.host) {
    throw new Error(`Backend is malformed (missing host)`);
  }

  return new Kuzzle(new WebSocket(backend.host, backend.options || null), sdkOptions);
};

/**
 * The VueKuzzle plugin. Makes the Kuzzle SDK available in Vue components as
 * `this.$kuzzle`.
 * 
 * @param Vue The Vue application to apply the plugin to
 * @param options Options passed to the Kuzzle SDK constructor
 * 
 * @see https://docs.kuzzle.io/sdk/js/7/core-classes/kuzzle/constructor/#options
 */
export function VueKuzzle(Vue: typeof _Vue, options: any) {
  const sdkOptions = options.sdkOptions ? options.sdkOptions : {};
  Vue.prototype.$kuzzle = instantiateKuzzleSDK(options.backends, sdkOptions);
}
