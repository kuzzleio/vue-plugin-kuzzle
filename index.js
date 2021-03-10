import { Kuzzle, WebSocket } from 'kuzzle-sdk/dist/kuzzle';

const instantiateKuzzleSDK = backends => {
  if (!backends) {
    backends = {
      local: {
        host: 'localhost',
        options: {
          port: 7512,
          sslConnection: false
        }
      }
    };
  }

  let backendName = process.env.VUE_APP_BACKEND
    ? process.env.VUE_APP_BACKEND
    : 'local';

  if (process.env.NODE_ENV === 'production') {
    // Define here which backend is to be used by the production build
  }

  const backend = backends[backendName] ? backends[backendName] : null;

  if (!backend) {
    throw new Error(`Unable to find backend ${backendName}`);
  }

  if (!backend.host || !backend.options) {
    throw new Error(`Backend ${backendName} is malformed`);
  }

  return new Kuzzle(new WebSocket(backend.host, backend.options));
};

const VueKuzzle = {
  install(app, options) {
    app.config.globalProperties.$kuzzle = instantiateKuzzleSDK(options.backends);
  }
};

export default VueKuzzle;
