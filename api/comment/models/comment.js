'use strict';

const { notificationEvent, CHANNEL } = require('../../notification/config/notification-events')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterCreate: async (result) => {
      notificationEvent.emit(CHANNEL.PostCommented, result);
    }
  }
};
