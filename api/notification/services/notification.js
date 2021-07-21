'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  markAsSeen(user) {
    return strapi.models.notification.update({ user }, { new: false }, { multi: true });
  },

  markAsRead({ user, id }) {
    return strapi.models.notification.update({ user, ...(id && { _id: id }) }, { readAt: new Date() }, { multi: true });
  },
};
