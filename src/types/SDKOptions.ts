import { JSONObject, RequestPayload } from 'kuzzle-sdk';

/**
 * ? Type extracted from Kuzzle constructor because it's not provide by `kuzzle-sdk` package
 *
 * TODO export this type directly in kuzzle-sdk
 */
export interface SDKOptions {
  /**
   * Automatically renew all subscriptions on a `reconnected` event
   * Default: `true`
   */
  autoResubscribe?: boolean;
  /**
   * Time (in ms) during which a similar event is ignored
   * Default: `200`
   */
  eventTimeout?: number;
  /**
   * Common volatile data, will be sent to all future requests
   * Default: `{}`
   */
  volatile?: JSONObject;
  /**
   * If `true`, automatically queues all requests during offline mode
   * Default: `false`
   */
  autoQueue?: boolean;
  /**
   * If `true`, automatically replays queued requests
   * on a `reconnected` event
   * Default: `false`
   */
  autoReplay?: boolean;
  /**
   * Custom function called during offline mode to filter
   * queued requests on-the-fly
   */
  queueFilter?: (request: RequestPayload) => boolean;
  /**
   * Called before dequeuing requests after exiting offline mode,
   * to add items at the beginning of the offline queue
   */
  offlineQueueLoader?: (...any: any[]) => any;
  /**
   * Number of maximum requests kept during offline mode
   * Default: `500`
   */
  queueMaxSize?: number;
  /**
   * Time a queued request is kept during offline mode, in milliseconds
   * Default: `120000`
   */
  queueTTL?: number;
  /**
   * Delay between each replayed requests, in milliseconds
   * Default: `10`
   */
  replayInterval?: number;
  /**
   * Time (in ms) during which a request will still be waited to be resolved
   * Set it to `-1` if you want to wait indefinitely.
   * Default: `-1`
   */
  requestTimeout?: number;
  /**
   * Time (in ms) during which a TokenExpired event is ignored
   * Default: `1000`
   */
  tokenExpiredInterval?: number;
  /**
   * If set to `auto`, the `autoQueue` and `autoReplay` are also set to `true`
   */
  offlineMode?: 'auto';
  /**
   * If `true` uses cookie to store token
   * Only supported in a browser
   * Default: `false`
   */
  cookieAuth?: boolean;
  /**
   * Show deprecation warning in development mode (hidden either way in production)
   * Default: `true`
   */
  deprecationWarning?: boolean;
}
