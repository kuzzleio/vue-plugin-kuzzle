import Vue from 'vue';
import _Vue from 'vue';
import { Kuzzle } from 'kuzzle-sdk';

declare module 'vue/types/vue' {
  interface Vue {
    $kuzzle: Kuzzle;
  }
}

export interface Backends {
  [name: string]: Backend
}

export interface Backend {
  host: string;
  options: {
    port: number;
    sslConnection: boolean
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
export declare function VueKuzzle(Vue: typeof _Vue, options: any): void;

/**
 * Instantiates the Kuzzle SDK by resolving the backend from the given config.
 * 
 * @param backendsConfig 
 * @param sdkOptions 
 */
export declare function instantiateKuzzleSDK(backendsConfig: Backends, sdkOptions: any): Kuzzle
