const Joi = require('joi');

const subscriptionCreateEventSchema = Joi.object({
  user: Joi.string().required(),
  collectionName: Joi.string().required(),
  collectionId: Joi.string()
    .required()
    .external(async (value) => {
      const story = await strapi.services.story.findOne({
        id: value,
      });
      if (!story) {
        throw new Error('Story is not exists');
      }

      return value;
    }),
}).unknown(true);

module.exports = {
  subscriptionCreateEventSchema,
};
