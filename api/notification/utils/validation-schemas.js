const Joi = require('joi');

const postCommentedEventSchema = Joi.object({
  id: Joi.string().required(),
  user: Joi.object().required(),
  content: Joi.string().required(),
  post: Joi.object().required(),
}).unknown(true);

module.exports = {
  postCommentedEventSchema,
};
