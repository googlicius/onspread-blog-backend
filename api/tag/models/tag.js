'use strict';

const slugify = require('slugify');

function generateSlug(data) {
  if (data.name) {
    data.slug = slugify(data.name).toLowerCase();
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
    },

    beforeUpdate: async (_params, data) => {
      generateSlug(data);
    },
  },
};
