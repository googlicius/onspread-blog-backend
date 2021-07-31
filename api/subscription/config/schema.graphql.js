'use strict';

module.exports = {
  query: `
    """
    Get one subscription by userId, collectionName, and collectionId.
    """
    subscriptionByUserAndCollection(user: String!, collectionName: String!, collectionId: String!): Subscription
  `,
  type: {},
  resolver: {
    Query: {
      subscriptionByUserAndCollection: {
        resolverOf: 'application::subscription.subscription.findOne',
        resolver(_parent, options) {
          return strapi.query('subscription').findOne({
            user: options.user,
            collectionName: options.collectionName,
            collectionId: options.collectionId,
          });
        },
      },
    },
  },
};
