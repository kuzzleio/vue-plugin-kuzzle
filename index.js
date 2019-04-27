import { Kuzzle, WebSocket } from 'kuzzle-sdk/dist/kuzzle';

const instantiateKuzzleSDK = (backendOptions) => {
  let backend;

  if (!backendOptions) {
    backend = {
      host: 'localhost',
      options: {
        port: 7512,
        sslConnection: false
      }
    };
  }

  if (process.env.VUE_KUZZLE_BACKEND) {
    backend = JSON.parse(process.env.VUE_KUZZLE_BACKEND);
  }

  if (!backend.host || !backend.options) {
    throw new Error(`Backend ${backendName} is malformed`);
  }

  return new Kuzzle(new WebSocket(backend.host, backend.options));
};

const VueKuzzle = {
  install(Vue, options) {
    Vue.prototype.$kuzzle = instantiateKuzzleSDK(options);
  }
};

export default VueKuzzle;
