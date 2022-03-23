declare module 'vue-kuzzle' {
  import Vue, { PluginFunction } from 'vue';
  export const install: PluginFunction<{}>;

  module 'vue/types/vue' {
    interface Vue {
      $kuzzle: any;
    }
  }
}