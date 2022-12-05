import * as Joi from "joi";
import { QuestionType } from "../questions.interface";

const questionschema = Joi.object({
  surveyId: Joi.string(),
  surveyName: Joi.string().optional(),
  surveyDescription: Joi.string().allow("", null).optional(),
  content: Joi.array()
    .items(
      Joi.object({
        id: Joi.string(),
        questionName: Joi.string(),
        questionType: Joi.string().valid(...Object.values(QuestionType)),
        required: Joi.boolean().required(),
        answers: Joi.array().items(
          Joi.object({
            answer: Joi.string(),
          })
        ),
      })
    )
    .optional(),
});
const updateContentSchema = Joi.object({
  surveyId: Joi.string(),
  content: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      questionName: Joi.string(),
      questionType: Joi.string().valid(...Object.values(QuestionType)),
      required: Joi.boolean().required(),
      answers: Joi.array().items(
        Joi.object({
          answer: Joi.string(),
        })
      ),
    })
  ),
});

const surveySchema = Joi.object({
  surveyName: Joi.string().allow("", null).optional(),
  surveyDescription: Joi.string().allow("", null).optional(),
  creatorId: Joi.string(),
  content: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      questionName: Joi.string(),
      questionType: Joi.string().valid(...Object.values(QuestionType)),
      required: Joi.boolean().required(),
      answers: Joi.array().items(
        Joi.object({
          answer: Joi.string(),
        })
      ),
    })
  ),
});

const surveyId = Joi.object({
  id: Joi.string(),
});

const questionId = Joi.object({
  surveyId: Joi.string(),
  questionId: Joi.string(),
});

export const createSurveyReqSchema = Joi.object({
  body: surveySchema,
  query: {},
  params: {},
});

export const addQuestionReqSchema = Joi.object({
  body: questionschema,
  query: {},
  params: {},
});
export const updateContentReqSchema = Joi.object({
  body: updateContentSchema,
  query: {},
  params: {},
});

export const getSurveyByIdReqSchema = Joi.object({
  body: {},
  query: surveyId,
  params: {},
});
export const getAllReqSchema = Joi.object({
  body: {},
  query: {},
  params: {},
});

export const getQuestionReqSchema = Joi.object({
  body: {},
  query: questionId,
  params: {},
});

export const updateQuestionReqSchema = Joi.object({
  body: questionschema,
  query: questionId,
  params: {},
});
