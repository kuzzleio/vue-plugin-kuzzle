import { Backends, Backend, KuzzleProtocol } from '../types';

const LS_KEY = 'kuzzle-backend';
const GLOBAL_NAME = 'kuzzleBackend';

export function getBackendFromConf(backendsConfig: Backends = {}): Backend | null {
  /* eslint-disable sort-keys */
  const backends: Backends = {
    default: {
      host: process.env.VUE_APP_BACKEND_HOST ?? 'localhost',
      protocol:
        (process.env.VUE_APP_BACKEND_PROTO as KuzzleProtocol | undefined) ??
        KuzzleProtocol.WEBSOCKET,
      options: {
        port: parseInt(process.env.VUE_APP_BACKEND_PORT ?? '7512'),
        sslConnection: process.env.VUE_APP_BACKEND_SSL === 'true' || false,
      },
    },
    ...backendsConfig,
  };
  /* eslint-enable sort-keys */

  const backendName = process.env.VUE_APP_BACKEND ?? 'default';

  if (backends[backendName] === undefined) {
    throw new Error(`Unable to find backend ${backendName} in configuration.`);
  }

  return backends[backendName] ?? null;
}

export function getBackendFromLocalStorage(): Backend | null {
  const lsItem = localStorage.getItem(LS_KEY);
  if (lsItem === null) {
    return null;
  }
  const backend = JSON.parse(lsItem);

  if (typeof backend !== 'object') {
    throw new Error(
      `Item found in localStorage (${LS_KEY}) is malformed. Expected an object, found ${backend}`,
    );
  }

  return backend;
}

export function getBackendFromWindow(): Backend | null {
  if ((window as any)[GLOBAL_NAME] === undefined) {
    return null;
  }

  const backend = JSON.parse((window as any)[GLOBAL_NAME]);

  if (typeof backend !== 'object') {
    throw new Error(
      `Item found in global (${GLOBAL_NAME}) is malformed. Expected an object, found ${backend}`,
    );
  }

  return backend;
}
