const env = (name, defaultValue) => {
  return (typeof process.env[name] !== 'undefined' && process.env[name]) || defaultValue;
};

module.exports = {
  env,
  // set this to whatever you believe should be the max age for your cache control
  APOLLO_SERVER_PERSISTED_QUERIES_TTL: env('APOLLO_SERVER_PERSISTED_QUERIES_TTL', 1800),
  APOLLO_SERVER_CACHE_MAXAGE: env('APOLLO_SERVER_CACHE_MAXAGE', 60),
};
