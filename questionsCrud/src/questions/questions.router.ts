import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';
import { ValidateRequest } from '../utils/joi';
import { QuestionController } from './questions.controller';
import {
  createSurveyReqSchema, addQuestionReqSchema, getSurveyByIdReqSchema, getQuestionReqSchema, updateQuestionReqSchema, getAllReqSchema, updateContentReqSchema, updateRepliersReqSchema, updateIsOpenReqSchema,
} from './validator/questions.schema';

const QuestionRouter: Router = Router();

QuestionRouter.post('/createSurvey', ValidateRequest(createSurveyReqSchema), wrapAsync(QuestionController.createSurvey));
QuestionRouter.put('/updateSurvey', ValidateRequest(addQuestionReqSchema), wrapAsync(QuestionController.updateSurvey));
QuestionRouter.put('/updateRepliers', ValidateRequest(updateRepliersReqSchema), wrapAsync(QuestionController.updateRepliers));
QuestionRouter.put('/updateIsOpen', ValidateRequest(updateIsOpenReqSchema), wrapAsync(QuestionController.updateIsOpen));
QuestionRouter.put('/updateContent', ValidateRequest(updateContentReqSchema), wrapAsync(QuestionController.updateContent));
QuestionRouter.put('/updateLastUpdated', ValidateRequest(getSurveyByIdReqSchema), wrapAsync(QuestionController.updateLastUpdated));
QuestionRouter.get('/getSurveyById', ValidateRequest(getSurveyByIdReqSchema), wrapAsync(QuestionController.getSurveyById));
QuestionRouter.get('/getAll', ValidateRequest(getAllReqSchema), wrapAsync(QuestionController.getAll));
QuestionRouter.delete('/deleteSurveyById', ValidateRequest(getSurveyByIdReqSchema), wrapAsync(QuestionController.deleteSurveyById));

QuestionRouter.get('/', ValidateRequest(getQuestionReqSchema), wrapAsync(QuestionController.getQuestion));
QuestionRouter.delete('/deleteQuestion', ValidateRequest(getQuestionReqSchema), wrapAsync(QuestionController.deleteQuestion));
QuestionRouter.put('/updateQuestion', ValidateRequest(updateQuestionReqSchema), wrapAsync(QuestionController.updateQuestion));

export { QuestionRouter };
