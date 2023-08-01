import { getCurrentInstance } from 'vue';
import { Kuzzle } from 'kuzzle-sdk';

export function useKuzzle(): Kuzzle {
  const vueInstance = getCurrentInstance();
  // Check only in development mode otherwise throw a false error
  if (process.env.NODE_ENV !== 'production' && vueInstance === null) {
    throw new Error(
      `Missing current instance. useKuzzle() must be called inside <script setup> or setup().`,
    );
  }

  const vue = (vueInstance as NonNullable<ReturnType<typeof getCurrentInstance>>).proxy;
  return vue.$root.$kuzzle;
}
