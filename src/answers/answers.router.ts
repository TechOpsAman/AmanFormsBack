import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';
import { ValidateRequest } from '../utils/joi';
import { AnswerController } from './answers.controller';
import {
  postSurveySchema, getSurveySchema,
} from './validator/answers.schema';

const AnswerRouter: Router = Router();

AnswerRouter.post('/', ValidateRequest(postSurveySchema), wrapAsync(AnswerController.create));
AnswerRouter.get('/find', ValidateRequest(getSurveySchema), wrapAsync(AnswerController.showSurveyById));

export { AnswerRouter };   