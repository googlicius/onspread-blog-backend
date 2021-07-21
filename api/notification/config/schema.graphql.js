'use strict';

module.exports = {
  mutation: `
  """
  Mark all new notifications as seen.
  """
  markNotificationsAsSeen(user: ID!): String!

  """
  Mark all notifications as read.
  """
  markNotificationsAsRead(user: ID!, id: ID): String!
  `,
  resolver: {
    Mutation: {
      markNotificationsAsSeen: {
        resolverOf: 'application::notification.notification.markAsSeen',
        async resolver(_parent, options) {
          await strapi.services.notification.markAsSeen(options.user);
          return 'ok';
        },
      },
      markNotificationsAsRead: {
        resolverOf: 'application::notification.notification.markAsRead',
        async resolver(_parent, options) {
          await strapi.services.notification.markAsRead(options);
          return 'ok';
        },
      }
    },
  },
};
