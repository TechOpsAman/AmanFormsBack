import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';
import { ValidateRequest } from '../utils/joi';
import { QuestionController } from './questions.controller';
import {
  createSurveyReqSchema, addQuestionReqSchema, getSurveyByIdReqSchema, getQuestionReqSchema, updateQuestionReqSchema,
} from './validator/questions.schema';

const QuestionRouter: Router = Router();

QuestionRouter.post('/createSurvey', ValidateRequest(createSurveyReqSchema), wrapAsync(QuestionController.createSurvey));
QuestionRouter.put('/updateSurvey', ValidateRequest(addQuestionReqSchema), wrapAsync(QuestionController.updateSurvey));
QuestionRouter.get('/getSurveyById', ValidateRequest(getSurveyByIdReqSchema), wrapAsync(QuestionController.getSurveyById));
QuestionRouter.delete('/deleteSurveyById', ValidateRequest(getSurveyByIdReqSchema), wrapAsync(QuestionController.deleteSurveyById));

QuestionRouter.get('/getQuestion', ValidateRequest(getQuestionReqSchema), wrapAsync(QuestionController.getQuestion));
QuestionRouter.delete('/deleteQuestion', ValidateRequest(getQuestionReqSchema), wrapAsync(QuestionController.deleteQuestion));
QuestionRouter.put('/updateQuestion', ValidateRequest(updateQuestionReqSchema), wrapAsync(QuestionController.updateQuestion));


export { QuestionRouter };
