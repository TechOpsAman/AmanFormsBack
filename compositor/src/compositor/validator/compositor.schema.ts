import * as Joi from 'joi';

const surveyIdSchema = Joi.object({
  surveyId: Joi.string().required(),
});

export const deleteSurveySchema = Joi.object({
  body: {},
  query: surveyIdSchema,
  params: {},
});

export const getSurveyResultsSchema = Joi.object({
  body: {},
  query: surveyIdSchema,
  params: {},
});
