import { PluginFunction } from 'vue';
import type { Kuzzle } from 'kuzzle-sdk';

import { instantiateKuzzleSDK } from './helpers';
import type { Backends, SDKOptions } from './types';

export interface VueKuzzleOptions {
  backends: Backends;
  sdkOptions?: SDKOptions;
}

/**
 * Augment the typings of Vue.js
 *
 * ? Needed to add type for `$kuzzle` on Vue type
 */
declare module 'vue/types/vue' {
  interface Vue {
    $kuzzle: Kuzzle;
  }
}

/**
 * The VueKuzzle plugin. Makes the Kuzzle SDK available in Vue components as
 * `this.$kuzzle`.
 *
 * @param Vue The Vue application to apply the plugin to
 * @param options Options passed to the Kuzzle SDK constructor
 *
 * @see https://docs.kuzzle.io/sdk/js/7/core-classes/kuzzle/constructor/#options
 */
export const VueKuzzle: PluginFunction<VueKuzzleOptions> = (Vue, options) => {
  const sdkOptions = options?.sdkOptions ?? {};
  Vue.prototype.$kuzzle = instantiateKuzzleSDK(options?.backends, sdkOptions);
};
