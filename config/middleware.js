module.exports = {
  //...
  settings: {
    cors: {
      origin: [process.env.FRONTEND_URL, 'http://localhost:1337'],
    },
  },
};
