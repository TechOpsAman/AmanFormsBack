import * as Joi from 'joi';

const iSection = Joi.object({
  questionId: Joi.string().required(),
  answers: Joi.array().items(Joi.string()).required(),
});

const surveySchema = Joi.object({
  surveyId: Joi.string().hex().length(24).required(),
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



