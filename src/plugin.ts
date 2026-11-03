import type { App, InjectionKey, Plugin } from 'vue';
import type { Kuzzle } from 'kuzzle-sdk';

import { instantiateKuzzleSDK } from './helpers';
import type { Backends, SDKOptions } from './types';

export interface VueKuzzleOptions {
  backends?: Backends;
  sdkOptions?: SDKOptions;
}

/**
 * Injection key under which the plugin provides the Kuzzle SDK instance.
 */
export const kuzzleInjectionKey: InjectionKey<Kuzzle> = Symbol('kuzzle');

// Duck typing rather than `instanceof`: the app may resolve another copy of
// kuzzle-sdk than the plugin does.
function isKuzzle(value: Kuzzle | VueKuzzleOptions): value is Kuzzle {
  return typeof (value as Kuzzle).connect === 'function';
}

/**
 * Augment the typings of Vue.js so that `this.$kuzzle` is typed in components.
 */
declare module 'vue' {
  interface ComponentCustomProperties {
    $kuzzle: Kuzzle;
  }
}

/**
 * The VueKuzzle plugin. Makes the Kuzzle SDK available in Vue components as
 * `this.$kuzzle`, and to the Composition API through `useKuzzle()`.
 *
 * It takes either an already instantiated Kuzzle SDK, or the options to
 * instantiate one (`backends` and `sdkOptions`, as the Vue 2 plugin did).
 *
 * @see https://docs.kuzzle.io/sdk/js/7/core-classes/kuzzle/constructor/#options
 */
export const VueKuzzle: Plugin<[(Kuzzle | VueKuzzleOptions)?]> = (
  app: App,
  kuzzleOrOptions: Kuzzle | VueKuzzleOptions = {},
) => {
  const kuzzle = isKuzzle(kuzzleOrOptions)
    ? kuzzleOrOptions
    : instantiateKuzzleSDK(kuzzleOrOptions.backends, kuzzleOrOptions.sdkOptions ?? {});

  app.config.globalProperties.$kuzzle = kuzzle;
  app.provide(kuzzleInjectionKey, kuzzle);
};
