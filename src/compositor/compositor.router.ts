import { Router } from 'express';
import { wrapAsync } from '../utils/wrapper';
import { CompositorController } from './compositor.controller';
import { ValidateRequest } from '../utils/joi';
import {
  deleteSurveySchema,
  getSurveyResultsSchema,
} from './validator/compositor.schema';

const compositorRouter: Router = Router();

compositorRouter.delete(
  '/deleteSurvey/:id/id',
  ValidateRequest(deleteSurveySchema),
  wrapAsync(CompositorController.deleteSurvey)
);
compositorRouter.get(
  '/getSurveyResults/:id/id',
  ValidateRequest(getSurveyResultsSchema),
  wrapAsync(CompositorController.getSurveyResults)
);

export { compositorRouter };
