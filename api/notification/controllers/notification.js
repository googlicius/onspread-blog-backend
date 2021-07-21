'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Currently, the logic is handled at graphql resolver,
   * This action method is used as a ROLE that can be manage from admin settings.
   */
  markAsSeen(ctx) {
    return 'ok';
  },

  /**
   * Currently, the logic is handled at graphql resolver,
   * This action method is used as a ROLE that can be manage from admin settings.
   */
  markAsRead() {
    return 'ok';
  },
};
