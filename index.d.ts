import Vue from 'vue';
import _Vue from 'vue';
import { Kuzzle } from 'kuzzle-sdk';

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
 * @param options Options passed to the Kuzzle SDK Websocket constructor
 *
 * @see https://next-docs.kuzzle.io/sdk/js/7/protocols/websocket/constructor/
 */
export declare function VueKuzzle(Vue: typeof _Vue, options: any): void;
