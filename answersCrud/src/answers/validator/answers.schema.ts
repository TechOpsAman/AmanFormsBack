import * as Joi from 'joi';

const iSection = Joi.object({
  questionName: Joi.string().required(),
  questionType: Joi.string().required(),
  required: Joi.boolean().required(),
  answers: Joi.array().items(Joi.string().allow("", null)).required(),
});

const surveySchema = Joi.object({
  surveyId: Joi.string().length(24).required(),
  userId: Joi.string().hex().length(24).required(),
  content: Joi.array().items(iSection).required(),
});

const surveyIdSchema = Joi.object({
  surveyId: Joi.string().required(),
});

export const postSurveySchema = Joi.object({
  body: surveySchema,
  query: {},
  params: {},
});

export const getSurveySchema = Joi.object({
  body: {},
  query: surveyIdSchema,
  params: {},
});



