const Joi = require('joi');

const postSaveValidationSchema = Joi.object({
  story: Joi.string(),
  storySeq: Joi.when('story', {
    is: Joi.exist(),
    then: Joi.number().required(),
    otherwise: Joi.invalid(),
  }),
}).unknown(true);

module.exports = {
  postSaveValidationSchema,
};
