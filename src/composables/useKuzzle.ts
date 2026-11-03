import { hasInjectionContext, inject } from 'vue';
import type { Kuzzle } from 'kuzzle-sdk';

import { kuzzleInjectionKey } from '../plugin';

/**
 * Returns the Kuzzle SDK instance provided by the VueKuzzle plugin.
 *
 * Must be called inside `setup()` / `<script setup>` (or `app.runWithContext()`)
 * of an app that installed the plugin.
 */
export function useKuzzle(): Kuzzle {
  if (!hasInjectionContext()) {
    throw new Error('useKuzzle() must be called inside <script setup> or setup().');
  }

  const kuzzle = inject(kuzzleInjectionKey, null);

  if (kuzzle === null) {
    throw new Error(
      'No Kuzzle SDK instance provided: install the VueKuzzle plugin with app.use().',
    );
  }

  return kuzzle;
}
