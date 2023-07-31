/**
 * Augment the typings of Vue.js
 */
import { Kuzzle } from 'kuzzle-sdk';
declare module 'vue/types/vue' {
  interface Vue {
    $kuzzle: Kuzzle;
  }
}
