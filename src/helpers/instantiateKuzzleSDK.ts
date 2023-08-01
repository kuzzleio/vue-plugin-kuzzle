import { Kuzzle, KuzzleAbstractProtocol, Http, WebSocket } from 'kuzzle-sdk';
import { Backends, Backend, KuzzleProtocol, SDKOptions } from '../types';
import { getBackendFromLocalStorage, getBackendFromWindow, getBackendFromConf } from './getConfig';

function protocolFactory(backend: Backend): KuzzleAbstractProtocol {
  switch (backend.protocol) {
    case KuzzleProtocol.HTTP:
      return new Http(backend.host, backend.options);

    case KuzzleProtocol.WEBSOCKET:
    default:
      return new WebSocket(backend.host, backend.options);
  }
}

/**
 * Instantiates the Kuzzle SDK by resolving the backend from the given config.
 *
 * @param backendsConfig
 * @param sdkOptions
 */
export function instantiateKuzzleSDK(backendsConfig?: Backends, sdkOptions?: SDKOptions): Kuzzle {
  const backend: Backend | null =
    getBackendFromLocalStorage() ?? getBackendFromWindow() ?? getBackendFromConf(backendsConfig);

  if (backend === null) {
    throw new Error('No backend resolved.');
  }

  if (backend.host === undefined) {
    throw new Error(`Backend is malformed (missing host)`);
  }

  return new Kuzzle(protocolFactory(backend), sdkOptions);
}
