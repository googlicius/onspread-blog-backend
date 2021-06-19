const origin = process.env.CORS_ORIGIN.split(',').map((url) => url.trim());

module.exports = {
  //...
  settings: {
    cors: {
      origin,
    },
  },
};
