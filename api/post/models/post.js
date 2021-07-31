'use strict';

const slugify = require('slugify');
const { notificationEvent, CHANNEL } = require('../../notification/config/notification-events');

function generateSlug(data) {
  if (data.title) {
    data.slug = slugify(data.title + '-' + new Date().getTime());
  }
}

async function removeOldHomeFeaturedPost(data) {
  if (data.homeFeatured === true) {
    if (data._id) {
      const post = await strapi.services.post.findOne({ _id: data._id });
      if (!post.published_at) {
        return;
      }
    }

    const postDoc = await strapi.services.post.findOne({
      homeFeatured: true,
      _id: { $ne: data._id },
    });

    if (postDoc) {
      await strapi.services.post.update({ id: postDoc.id }, { homeFeatured: false });
    }
  }
}

async function markPostJustPublished(params, data) {
  const post = await strapi.models.post.findOne({ _id: params._id });
  if (data.published_at && post.isNewPost !== false) {
    data.isNewPost = false;
    data.justPublished = true;
  }
}

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      generateSlug(data);
      await removeOldHomeFeaturedPost(data);
    },
    beforeUpdate: async (params, data) => {
      await Promise.all([markPostJustPublished(params, data), removeOldHomeFeaturedPost(data)]);
    },
    afterUpdate: (post, params, data) => {
      notificationEvent.emit(CHANNEL.PostUpdated, post, params, data);
    },
  },
};
