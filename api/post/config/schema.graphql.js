'use strict';

module.exports = {
  definition: ``,
  query: `
    """
    Get specific post by its slug
    """
    postBySlug(slug: String!): Post
  `,
  type: {},
  resolver: {
    Query: {
      postBySlug: {
        resolverOf: 'application::post.post.findOne',
        resolver(_parent, options) {
          return strapi.services.post.findOne({
            slug: options.slug,
          });
        },
      },
    },
  },
};
