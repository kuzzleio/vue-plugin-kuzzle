import { getCurrentInstance, inject, Vue } from 'vue';
import { Kuzzle } from 'kuzzle-sdk';

function getVueInstance(method: string): Vue {
  const vueInstance = getCurrentInstance();
  // Check only in development mode otherwise throw a false error
  if (process.env.NODE_ENV !== 'production' && vueInstance === null) {
    throw new Error(
      `Missing current instance. ${method}() must be called inside <script setup> or setup().`,
    );
  }
  // eslint-disable-next-line eqeqeq
  if (vueInstance == null) {
    throw new Error(
      `Missing current instance. ${method}() must be called inside <script setup> or setup().`,
    );
  }
  return vueInstance.proxy as unknown as Vue;
}

export function useKuzzle(): Kuzzle {
  const $kuzzle = getVueInstance('useKuzzle').$kuzzle;

  // Check only in development mode otherwise throw a false error
  if (process.env.NODE_ENV !== 'production' && $kuzzle === null) {
    throw new Error(
      `Missing current instance. useKuzzle() must be called inside <script setup> or setup().`,
    );
  }

  const kuzzle = inject<Kuzzle>('$kuzzle', $kuzzle);
  if (typeof kuzzle === 'undefined') {
    throw new Error('$kuzzle is not provided');
  }

  return kuzzle;
}
