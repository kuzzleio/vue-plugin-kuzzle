import { Kuzzle, WebSocket } from 'kuzzle-sdk';
import _Vue  from 'vue';

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

const instantiateKuzzleSDK = (backendsConfig: Backends, sdkOptions: any): Kuzzle => {
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

  const backend = backends[backendName] ? backends[backendName] : null;

  if (!backend) {
    throw new Error(`Unable to find backend ${backendName}`);
  }

  if (!backend.host || !backend.options) {
    throw new Error(`Backend ${backendName} is malformed`);
  }

  return new Kuzzle(new WebSocket(backend.host, backend.options), sdkOptions);
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
