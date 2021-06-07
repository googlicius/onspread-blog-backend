const apolloServerPluginResponseCache = require('apollo-server-plugin-response-cache');
const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');

// set this to whatever you believe should be the max age for your cache control
const MAX_AGE = +(process.env.APOLLO_SERVER_CACHE_MAXAGE || 60);
const TTL = +(process.env.APOLLO_SERVER_PERSISTED_QUERIES_TTL || 10);

module.exports = {
  federation: false,
  apolloServer: {
    persistedQueries: { ttl: TTL * MAX_AGE },
    cacheControl: { defaultMaxAge: MAX_AGE },
    plugins: [
      apolloServerPluginResponseCache({
        shouldReadFromCache,
        shouldWriteToCache,
        extraCacheKeyData,
        sessionId,
      }),
      injectCacheControl(),
    ],
  },
};

if (process.env.REDIS_URL) {
  const client = new Redis(process.env.REDIS_URL);
  const cache = new BaseRedisCache({ client });
  module.exports.apolloServer.cache = cache;
  module.exports.apolloServer.persistedQueries.cache = cache;
}

async function sessionId(requestContext) {
  // return a session ID here, if there is one for this request
  return null;
}

async function shouldReadFromCache(requestContext) {
  // decide if we should write to the cache in this request
  return true;
}

async function shouldWriteToCache(requestContext) {
  // decide if we should write to the cache in this request
  return true;
}

async function extraCacheKeyData(requestContext) {
  // use this to create any extra data that can be used for the cache key
}

function injectCacheControl() {
  return {
    requestDidStart(requestContext) {
      requestContext.overallCachePolicy = {
        scope: 'PUBLIC', // or 'PRIVATE'
        maxAge: MAX_AGE,
      };
    },
  };
}
