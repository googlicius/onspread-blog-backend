const apolloServerPluginResponseCache = require('apollo-server-plugin-response-cache');
const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const { APOLLO_SERVER_PERSISTED_QUERIES_TTL, APOLLO_SERVER_CACHE_MAXAGE } = require('../../../utils/env');

module.exports = {
  federation: false,
  apolloServer: {
    persistedQueries: { ttl: +APOLLO_SERVER_PERSISTED_QUERIES_TTL },
    cacheControl: { defaultMaxAge: +APOLLO_SERVER_CACHE_MAXAGE },
    plugins: [
      apolloServerPluginResponseCache({
        shouldReadFromCache,
        shouldWriteToCache,
        extraCacheKeyData,
        sessionId,
      }),
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
  const cc = requestContext.request.http.headers.get('cookie');

  if (typeof cc === 'string') {
    const parsedCookie = cookie.parse(cc);
    const jwtDecoded = parsedCookie.token && jwt.decode(parsedCookie.token);

    if (jwtDecoded) {
      return jwtDecoded.id || null;
    }
  }
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

// function injectCacheControl() {
//   return {
//     requestDidStart(requestContext) {
//       requestContext.overallCachePolicy = {
//         scope: 'PUBLIC', // or 'PRIVATE'
//         maxAge: MAX_AGE,
//       };
//     },
//   };
// }
