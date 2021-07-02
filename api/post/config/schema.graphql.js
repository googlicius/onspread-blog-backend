'use strict';

const Joi = require('joi');
const { getService } = require('strapi-plugin-content-manager/utils');

const giveHeartValidationSchema = Joi.object({
  postId: Joi.allow(),
  heart: Joi.number().min(1).max(100),
});

const model = 'application::post.post';

module.exports = {
  definition: `
    extend type Post {
      """
      Next post of series.
      """
      nextPost: Post
    }
  `,
  query: `
    """
    Get specific post by its slug
    """
    postBySlug(slug: String!): Post

    """
    Get featured post
    """
    featuredPost: Post
  `,
  mutation: `
    """
    Give heart from user to post
    """
    giveHeart(postId: ID!, heart: Int!): Int!

    """
    Publish post
    """
    publishPost(id: ID!): Post!

    """
    Unpublish post
    """
    unPublishPost(id: ID!): Post!
  `,
  type: {},
  resolver: {
    Post: {
      nextPost: {
        resolverOf: 'application::post.post.findOne',
        resolver(parent) {
          if (parent.story) {
            return strapi.query('post').findOne({
              _sort: 'storySeq:asc',
              _where: {
                story: parent.story,
                storySeq_gt: parent.storySeq,
              },
            });
          }
          return null;
        },
      },
    },
    Query: {
      postBySlug: {
        resolverOf: 'application::post.post.findOne',
        resolver(_parent, options) {
          return strapi.query('post').findOne({
            slug: options.slug,
          });
        },
      },
      featuredPost: {
        resolverOf: 'application::post.post.findOne',
        resolver() {
          return strapi.services.post.findOne({
            homeFeatured: true,
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
      publishPost: {
        resolverOf: 'plugins::content-manager.collection-types.publish',
        async resolver(_parent, options) {
          const entityManager = getService('entity-manager');
          const entity = await entityManager.findOneWithCreatorRoles(options.id, model);
          const result = await entityManager.publish(entity, model);
          return result;
        },
      },
      unPublishPost: {
        resolverOf: 'plugins::content-manager.collection-types.unpublish',
        async resolver(_parent, options) {
          const entityManager = getService('entity-manager');
          const entity = await entityManager.findOneWithCreatorRoles(options.id, model);
          const result = await entityManager.unpublish(entity, model);
          return result;
        },
      },
    },
  },
};
