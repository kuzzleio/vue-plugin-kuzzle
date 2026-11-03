## [5.0.0](https://github.com/kuzzleio/vue-plugin-kuzzle/compare/v4.7.0...v5.0.0) (2026-11-03)

### ⚠ BREAKING CHANGES

* requires Vue 3. vue and kuzzle-sdk are now peer
dependencies. Vue.prototype.$kuzzle is gone: use useKuzzle(),
this.$kuzzle or inject(kuzzleInjectionKey). Vue 2.7 users stay on 4.x
(npm install vue-plugin-kuzzle@vue2, maintained on the 4-stable branch).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

### Features

* change plugin initialization ([7963435](https://github.com/kuzzleio/vue-plugin-kuzzle/commit/796343534a03288f4940b6608cd7567a9854f803))
* make the Vue 3 plugin the main line ([d736df9](https://github.com/kuzzleio/vue-plugin-kuzzle/commit/d736df9b841965e92373a11a71b9eedd932ec444))
* upgrade to vue3 ([efc82a1](https://github.com/kuzzleio/vue-plugin-kuzzle/commit/efc82a102f7b12a13c483836e2a6638a84b96da0))
