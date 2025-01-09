import { HttpRoutes, JSONObject } from 'kuzzle-sdk';

export enum KuzzleProtocol {
  HTTP = 'http',
  WEBSOCKET = 'websocket',
}

export interface Backend {
  host: string;
  protocol: KuzzleProtocol;
  options: {
    port: number;
    sslConnection: boolean;
    headers?: JSONObject;
    reconnectionDelay?: number;
    pingInterval?: number;
    customRoutes?: HttpRoutes;
  };
}

export interface Backends {
  [name: string]: Backend;
}
