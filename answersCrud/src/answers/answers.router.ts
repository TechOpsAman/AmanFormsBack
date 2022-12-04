import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';
import { ValidateRequest } from '../utils/joi';
import { AnswerController } from './answers.controller';
import {
  postSurveySchema, getSurveySchema,
} from './validator/answers.schema';

const AnswerRouter: Router = Router();

AnswerRouter.post('/', ValidateRequest(postSurveySchema), wrapAsync(AnswerController.create));
AnswerRouter.get('/getSurveysById', ValidateRequest(getSurveySchema), wrapAsync(AnswerController.showSurveyById));
AnswerRouter.delete('/deleteSurveysById', ValidateRequest(getSurveySchema), wrapAsync(AnswerController.deleteSurveyById));

export { AnswerRouter };   