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
  };
}

export interface Backends {
  [name: string]: Backend;
}
