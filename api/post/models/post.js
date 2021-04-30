'use strict';

const slugify = require('slugify');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: (data) => {
      if (data.title) {
        data.slug = slugify(data.title + '-' + new Date().getTime());
      }
    },
    beforeUpdate: (_params, data) => {
      if (data.title) {
        data.slug = slugify(data.title + '-' + new Date().getTime());
      }
    },
  },
};
