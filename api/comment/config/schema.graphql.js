'use strict';

const Joi = require('joi');

const countValidationSchema = Joi.object({
  limit: Joi.allow(),
  postId: Joi.string(),
});

module.exports = {
  definition: ``,
  query: `
    """
    Count comment of its post
    """
    countPostComment(postId: ID!): Int!
  `,
  type: {},
  resolver: {
    Query: {
      countPostComment: {
        resolverOf: 'application::comment.comment.count',
        async resolver(_parent, options) {
          await countValidationSchema.validateAsync(options);

          return strapi.services.comment.count({
            post: options.postId,
          });
        },
      },
    },
  },
};
