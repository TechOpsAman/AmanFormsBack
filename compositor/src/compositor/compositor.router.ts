import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';
import { CompositorController } from './compositor.controller';
import { ValidateRequest } from '../utils/joi';
import {
  deleteSurveySchema,
  getSurveyResultsSchema,
} from './validator/compositor.schema';
// import * as passport from 'passport';

const compositorRouter: Router = Router();

compositorRouter.delete(
  '/deleteSurvey',
  ValidateRequest(deleteSurveySchema),
  wrapAsync(CompositorController.deleteSurvey)
);
compositorRouter.get(
  '/getSurveyResults',
  ValidateRequest(getSurveyResultsSchema),
  wrapAsync(CompositorController.getSurveyResults)
);

export { compositorRouter };
