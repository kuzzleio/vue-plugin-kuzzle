import { createApp, defineComponent, h } from 'vue';
import { Kuzzle, WebSocket } from 'kuzzle-sdk';
import { describe, expect, it } from 'vitest';

import { useKuzzle, VueKuzzle } from '../src';

function newKuzzle(): Kuzzle {
  return new Kuzzle(new WebSocket('localhost'));
}

describe('VueKuzzle', () => {
  it('exposes the given Kuzzle instance as $kuzzle and to useKuzzle()', () => {
    const kuzzle = newKuzzle();
    const app = createApp(defineComponent({ render: () => h('div') }));

    app.use(VueKuzzle, kuzzle);

    expect(app.config.globalProperties.$kuzzle).toBe(kuzzle);
    expect(app.runWithContext(() => useKuzzle())).toBe(kuzzle);
  });

  it('instantiates the SDK from the backends option', () => {
    const app = createApp(defineComponent({ render: () => h('div') }));

    app.use(VueKuzzle, {
      backends: {
        default: {
          host: 'kuzzle.example.com',
          options: { port: 443, sslConnection: true },
          protocol: 'websocket' as never,
        },
      },
    });

    const kuzzle = app.runWithContext(() => useKuzzle());
    expect(kuzzle).toBeInstanceOf(Kuzzle);
    expect(kuzzle.protocol.host).toBe('kuzzle.example.com');
    expect(app.config.globalProperties.$kuzzle).toBe(kuzzle);
  });
});

describe('useKuzzle', () => {
  it('throws outside of a setup context', () => {
    expect(() => useKuzzle()).toThrow(/inside <script setup> or setup\(\)/);
  });

  it('throws when the plugin is not installed', () => {
    const app = createApp(defineComponent({ render: () => h('div') }));

    expect(() => app.runWithContext(() => useKuzzle())).toThrow(/install the VueKuzzle plugin/);
  });
});
