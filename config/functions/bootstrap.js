'use strict';

const origin = process.env.CORS_ORIGIN.split(',').map((url) => url.trim());

function initSocketIO() {
  const io = require('socket.io')(strapi.server, {
    cors: {
      origin,
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  });

  io.on('connection', function (socket) {
    socket.on('join', ({ userId }, cb) => {
      socket.join(userId);

      // console.log(`Socket ${socket.id} joined room ${userId}.`);

      if (cb) {
        cb(`User ${userId} joined.`);
      }
    });

    // socket.on('disconnect', () => {
    //   console.log('disconnect', socket.id);
    // })
  });

  strapi.io = io;
}

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
  initSocketIO();
};
