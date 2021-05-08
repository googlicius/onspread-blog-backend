'use strict';

const slugify = require('slugify');

function generateSlug(data) {
  if (data.title) {
    data.slug = slugify(data.title + '-' + new Date().getTime());
  }
}

async function removeOldHomeFeaturedPost(data) {
  if (data.homeFeatured === true) {
    const postDoc = await strapi.services.post.findOne({
      homeFeatured: true,
      _id: { $ne: data._id },
    });

    if (postDoc) {
      await strapi.services.post.update(
        { id: postDoc.id },
        { homeFeatured: false },
      );
    }
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
    beforeUpdate: async (_params, data) => {
      // generateSlug(data);
      await removeOldHomeFeaturedPost(data);
    },
  },
};
