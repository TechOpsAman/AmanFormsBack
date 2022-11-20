import * as Joi from 'joi';

// 1. Delete survey and survey answers.
// 2. get survey questions from questions crud and the answers from answerscrud.

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
