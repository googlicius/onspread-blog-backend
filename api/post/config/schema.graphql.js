'use strict';

const Joi = require('joi');

const giveHeartValidationSchema = Joi.object({
  postId: Joi.allow(),
  heart: Joi.number().min(1).max(100),
});

module.exports = {
  definition: ``,
  query: `
    """
    Get specific post by its slug
    """
    postBySlug(slug: String!): Post
  `,
  mutation: `
    """
    Give heart from user to post
    """
    giveHeart(postId: ID!, heart: Int!): Int!
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
    Mutation: {
      giveHeart: {
        resolverOf: 'application::post.post.findOne',
        async resolver(_parent, options) {
          await giveHeartValidationSchema.validateAsync(options);

          const post = await strapi.services.post.findOne({
            id: options.postId,
          });
          const heart = (post.heart || 0) + options.heart;

          await strapi.services.post.update({ id: options.postId }, { heart });
          return heart;
        },
      },
    },
  },
};
